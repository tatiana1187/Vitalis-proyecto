package etec.backend.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class PedidoRequest(
    @field:NotBlank @field:Size(max = 150) val nombre: String,
    @field:NotBlank @field:Email @field:Size(max = 150) val email: String,
    @field:NotBlank @field:Size(max = 30) val telefono: String,
    val productoId: Int,
    @field:NotBlank @field:Size(max = 20) val talle: String,
    @field:Min(1) @field:Max(50) val cantidad: Int,
    @field:Size(max = 255) val direccion: String? = null,
    @field:Size(max = 500) val comentarios: String? = null
)
