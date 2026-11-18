
package etec.backend.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "pedidos")
class Pedido(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(nullable = false)
    var fecha: LocalDate = LocalDate.now(),

    @Column(nullable = false, length = 20)
    var estado: String = "pendiente",

    @Column(nullable = false)
    var total: Float = 0f,

    @Column(length = 500)
    var comentarios: String? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    var cliente: Cliente? = null,

    @OneToMany(mappedBy = "pedido")
    var detalles: MutableList<DetallePedido> = mutableListOf()
)
