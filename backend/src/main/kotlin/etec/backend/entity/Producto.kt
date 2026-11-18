
package etec.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "productos")
class Producto(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(nullable = false, length = 150)
    var nombre: String = "",

    @Column(length = 255)
    var descripcion: String? = null,

    @Column(nullable = false, length = 100)
    var tela: String = "",

    @Column(name = "precio_base", nullable = false)
    var precioBase: Float = 0f,

    @Column(nullable = false)
    var activo: Boolean = true,

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    var categoria: Categoria? = null,

    @OneToMany(mappedBy = "producto")
    var variantes: MutableList<Variante> = mutableListOf()
)
