package etec.backend.repository

import etec.backend.entity.Variante
import org.springframework.data.jpa.repository.JpaRepository

interface VarianteRepository : JpaRepository<Variante, Int> {
    fun findFirstByProductoIdAndTalleAndStockGreaterThanEqual(productoId: Int, talle: String, stock: Int): Variante?
}
