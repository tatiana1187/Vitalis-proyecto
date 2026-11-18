package etec.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "categorias")
class Categoria(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(nullable = false, length = 100)
    var nombre: String = ""
)