package etec.backend.dto

import java.time.LocalDate

data class PedidoResponse(
    val id: Int,
    val fecha: LocalDate,
    val estado: String,
    val total: Float
)
