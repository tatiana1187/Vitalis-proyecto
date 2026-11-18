
package etec.backend.dto

import etec.backend.entity.Producto

data class ProductoResponse(

    val id: Int,
    val nombre: String,
    val descripcion: String?,
    val tela: String,
    val precioBase: Float,
    val activo: Boolean,
    val categoriaId: Int?
) {
    companion object {

        fun fromEntity(p: Producto): ProductoResponse =
            ProductoResponse(
                id = p.id ?: 0,
                nombre = p.nombre,
                descripcion = p.descripcion,
                tela = p.tela,
                precioBase = p.precioBase,
                activo = p.activo,
                categoriaId = p.categoria?.id
            )
    }
}
