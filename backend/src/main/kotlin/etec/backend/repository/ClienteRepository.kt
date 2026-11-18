package etec.backend.repository

import etec.backend.entity.Cliente
import org.springframework.data.jpa.repository.JpaRepository

interface ClienteRepository : JpaRepository<Cliente, Int> {
    fun findFirstByEmail(email: String): Cliente?
}
