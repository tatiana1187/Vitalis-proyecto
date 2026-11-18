package etec.backend.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

data class ProductoRequest(

    @field:NotBlank
    @field:Size(max = 150)
    val nombre: String,

    @field:Size(max = 255)
    val descripcion: String? = null,

    @field:NotBlank
    @field:Size(max = 100)
    val tela: String,

    @field:NotNull
    @field:DecimalMin(value = "0.0", inclusive = true)
    val precioBase: Float,

    val activo: Boolean = true,

    val categoriaId: Int? = null
)