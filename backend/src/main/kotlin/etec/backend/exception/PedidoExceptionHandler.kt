package etec.backend.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

class PedidoInvalidoException(mensaje: String, val status: HttpStatus) : RuntimeException(mensaje)

@RestControllerAdvice
class PedidoExceptionHandler {

    // Usa el mismo ErrorResponse que ya tenés en GlobalExeptionHandler.kt
    @ExceptionHandler(PedidoInvalidoException::class)
    fun handle(ex: PedidoInvalidoException): ResponseEntity<ErrorResponse> =
        ResponseEntity.status(ex.status).body(
            ErrorResponse(status = ex.status.value(), error = ex.status.reasonPhrase, message = ex.message ?: "Pedido inválido")
        )
}
