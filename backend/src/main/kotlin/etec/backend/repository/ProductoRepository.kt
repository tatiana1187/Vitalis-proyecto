package etec.backend.repository

import etec.backend.entity.Producto
import org.springframework.data.jpa.repository.JpaRepository

interface ProductoRepository : JpaRepository<Producto, Int> {

    fun findByActivoTrue(): List<Producto>
}