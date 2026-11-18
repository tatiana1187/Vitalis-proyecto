package etec.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "detalle_pedido")
class DetallePedido(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(nullable = false)
    var cantidad: Int = 0,

    @Column(name = "precio_unitario", nullable = false)
    var precioUnitario: Float = 0f,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id")
    var pedido: Pedido? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variante_id")
    var variante: Variante? = null
)