
package etec.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "variantes")
class Variante(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(nullable = false, length = 50)
    var sku: String = "",

    @Column(nullable = false, length = 20)
    var talle: String = "",

    @Column(nullable = false, length = 50)
    var color: String = "",

    @Column(nullable = false)
    var stock: Int = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id")
    var producto: Producto? = null,

    @OneToMany(mappedBy = "variante")
    var detalles: MutableList<DetallePedido> = mutableListOf()
)
