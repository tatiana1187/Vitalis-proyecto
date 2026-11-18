
package etec.backend.service

import etec.backend.dto.ProductoRequest
import etec.backend.dto.ProductoResponse
import etec.backend.entity.Producto
import etec.backend.exception.ProductoNoEncontradoException
import etec.backend.repository.ProductoRepository
import etec.backend.repository.CategoriaRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ProductoService(
    private val productoRepository: ProductoRepository,
    private val categoriaRepository: CategoriaRepository
) {

    @Transactional(readOnly = true)
    fun listar(pageable: Pageable): Page<ProductoResponse> {
        return productoRepository.findAll(pageable)
            .map { ProductoResponse.fromEntity(it) }
    }

    @Transactional(readOnly = true)
    fun obtener(id: Int): ProductoResponse {
        val producto = productoRepository.findById(id)
            .orElseThrow { ProductoNoEncontradoException(id.toLong()) }

        return ProductoResponse.fromEntity(producto)
    }

    @Transactional
    fun crear(req: ProductoRequest): ProductoResponse {

        val categoria = req.categoriaId?.let { id ->
            categoriaRepository.findById(id)
                .orElseThrow { RuntimeException("Categoría no encontrada: $id") }
        }

        val nuevoProducto = Producto(
            nombre = req.nombre,
            descripcion = req.descripcion,
            tela = req.tela,
            precioBase = req.precioBase,
            activo = req.activo,
            categoria = categoria
        )

        val guardado = productoRepository.save(nuevoProducto)

        return ProductoResponse.fromEntity(guardado)
    }
}
