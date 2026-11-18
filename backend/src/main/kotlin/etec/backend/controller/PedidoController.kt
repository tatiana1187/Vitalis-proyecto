package etec.backend.controller

import etec.backend.dto.PedidoRequest
import etec.backend.dto.PedidoResponse
import etec.backend.service.PedidoService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/pedidos")
class PedidoController(private val pedidoService: PedidoService) {

    @PostMapping
    fun crear(@Valid @RequestBody req: PedidoRequest): ResponseEntity<PedidoResponse> =
        ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.crear(req))
}
