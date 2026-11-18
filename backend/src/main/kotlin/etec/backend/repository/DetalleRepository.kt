package etec.backend.repository

import etec.backend.entity.DetallePedido
import org.springframework.data.jpa.repository.JpaRepository

interface DetallePedidoRepository : JpaRepository<DetallePedido, Int>