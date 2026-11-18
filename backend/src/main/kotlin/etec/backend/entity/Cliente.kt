
package etec.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "clientes")
class Cliente(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(nullable = false, length = 150)
    var nombre: String = "",

    @Column(nullable = false, length = 20)
    var tipo: String = "",

    @Column(nullable = false, length = 150)
    var email: String = "",

    @Column(length = 30)
    var telefono: String? = null,

    @Column(length = 255)
    var direccion: String? = null,

    @OneToMany(mappedBy = "cliente")
    var pedidos: MutableList<Pedido> = mutableListOf()
)
