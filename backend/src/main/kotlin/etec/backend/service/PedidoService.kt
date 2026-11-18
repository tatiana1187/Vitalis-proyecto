package etec.backend.service

import etec.backend.dto.PedidoRequest
import etec.backend.dto.PedidoResponse
import etec.backend.entity.Cliente
import etec.backend.entity.DetallePedido
import etec.backend.entity.Pedido
import etec.backend.exception.PedidoInvalidoException
import etec.backend.exception.ProductoNoEncontradoException
import etec.backend.repository.ClienteRepository
import etec.backend.repository.DetallePedidoRepository
import etec.backend.repository.PedidoRepository
import etec.backend.repository.ProductoRepository
import etec.backend.repository.VarianteRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class PedidoService(
    private val productoRepository: ProductoRepository,
    private val varianteRepository: VarianteRepository,
    private val clienteRepository: ClienteRepository,
    private val pedidoRepository: PedidoRepository,
    private val detalleRepository: DetallePedidoRepository
) {

    @Transactional
    fun crear(req: PedidoRequest): PedidoResponse {
        val producto = productoRepository.findById(req.productoId)
            .orElseThrow { ProductoNoEncontradoException(req.productoId.toLong()) }

        val variante = varianteRepository
            .findFirstByProductoIdAndTalleAndStockGreaterThanEqual(req.productoId, req.talle, req.cantidad)
            ?: throw PedidoInvalidoException(
                "No hay stock del talle ${req.talle} para ${producto.nombre}", HttpStatus.CONFLICT
            )

        // Si el email ya existe se reutiliza el cliente; si no, se crea uno nuevo
        val cliente = clienteRepository.findFirstByEmail(req.email)
            ?: Cliente(nombre = req.nombre, tipo = "particular", email = req.email)
        cliente.nombre = req.nombre
        cliente.telefono = req.telefono
        req.direccion?.takeIf { it.isNotBlank() }?.let { cliente.direccion = it }
        val clienteGuardado = clienteRepository.save(cliente)

        val total = producto.precioBase * req.cantidad
        val pedido = pedidoRepository.save(Pedido(total = total, cliente = clienteGuardado, comentarios = req.comentarios?.takeIf { it.isNotBlank() }))
        detalleRepository.save(
            DetallePedido(cantidad = req.cantidad, precioUnitario = producto.precioBase, pedido = pedido, variante = variante)
        )
        variante.stock -= req.cantidad

        return PedidoResponse(pedido.id ?: 0, pedido.fecha, pedido.estado, pedido.total)
    }
}
