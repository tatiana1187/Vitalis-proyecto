"""Carga el catálogo de Vitalis+ en la base de datos.

    python datos.py                  -> agrega o actualiza los 12 productos (no duplica)
    python datos.py --ocultar-otros  -> además oculta de la web los productos que no son de Vitalis+
"""
import sys
from sqlalchemy import inspect, text
from database import Session, engine
from models import Categoria, Producto, Variante  # al importar models se crean las tablas que falten

TALLES = ["XS", "S", "M", "L", "XL", "XXL"]
STOCK_INICIAL = 20  # unidades por talle; ajustalo al stock real


def asegurar_columnas():
    # create_all no modifica tablas que ya existen: agregamos pedidos.comentarios si falta
    columnas = [c["name"] for c in inspect(engine).get_columns("pedidos")]
    if "comentarios" not in columnas:
        with engine.begin() as con:
            con.execute(text("ALTER TABLE pedidos ADD COLUMN comentarios VARCHAR(500) NULL"))
        print("Se agregó la columna pedidos.comentarios.")


asegurar_columnas()

# Abrimos la sesión usando la conexión que ya está configurada
session = Session()

# Productos reales de la página Vitalis Uniformes
productos_vitalis = [
    {
        "nombre": "Ambo verde",
        "descripcion": "Ambo de color verde. Color: Verde.",
        "precio": 45000
    },
    {
        "nombre": "Ambo blanco con detalles azules",
        "descripcion": "Ambo blanco con detalles en azul. Color: Blanco.",
        "precio": 44000
    },
    {
        "nombre": "Ambo azul clásico",
        "descripcion": "Ambo de color azul clásico. Color: Azul.",
        "precio": 48000
    },
    {
        "nombre": "Ambo estampado",
        "descripcion": "Ambo con diseño estampado. Color: Estampado.",
        "precio": 46000
    },
    {
        "nombre": "Ambo blanco",
        "descripcion": "Ambo de color blanco. Color: Blanco.",
        "precio": 42000
    },
    {
        "nombre": "Ambo floral rosa",
        "descripcion": "Ambo rosa con estampado floral. Color: Rosa.",
        "precio": 46000
    },
    {
        "nombre": "Ambo negro",
        "descripcion": "Ambo de color negro. Color: Negro.",
        "precio": 47000
    },
    {
        "nombre": "Ambo azul con cierre",
        "descripcion": "Ambo azul con cierre. Color: Azul.",
        "precio": 50000
    },
    {
        "nombre": "Ambo azul marino",
        "descripcion": "Ambo de color azul marino. Color: Azul.",
        "precio": 48000
    },
    {
        "nombre": "Ambo verde botella",
        "descripcion": "Ambo de color verde botella. Color: Verde.",
        "precio": 45000
    },
    {
        "nombre": "Ambo beige",
        "descripcion": "Ambo de color beige. Color: Beige.",
        "precio": 50000
    },
    {
        "nombre": "Ambo verde oscuro",
        "descripcion": "Ambo de color verde oscuro. Color: Verde.",
        "precio": 48000
    }
]


def color_de(datos):
    # "Ambo de color verde. Color: Verde." -> "Verde"
    return datos["descripcion"].split("Color:")[-1].strip(" .") or "Sin especificar"


try:
    # Buscamos la categoría "Ambos". Si no existe, la creamos.
    categoria = session.query(Categoria).filter_by(nombre="Ambos").first()
    if categoria is None:
        categoria = Categoria(nombre="Ambos")
        session.add(categoria)
        session.flush()

    for datos in productos_vitalis:
        producto = session.query(Producto).filter_by(nombre=datos["nombre"]).first()

        if producto is None:
            producto = Producto(
                nombre=datos["nombre"],
                descripcion=datos["descripcion"],
                tela="No especificada",
                precio_base=datos["precio"],
                activo=True,
                categoria_id=categoria.id
            )
            session.add(producto)
        else:
            producto.descripcion = datos["descripcion"]
            producto.tela = "No especificada"
            producto.precio_base = datos["precio"]
            producto.activo = True
            producto.categoria_id = categoria.id

        session.flush()  # necesitamos el id del producto

        # Una variante por talle: sin variantes con stock no se puede tomar un pedido
        for talle in TALLES:
            existe = session.query(Variante).filter_by(producto_id=producto.id, talle=talle).first()
            if existe is None:
                session.add(Variante(
                    sku=f"VIT-{producto.id}-{talle}", talle=talle, color=color_de(datos),
                    stock=STOCK_INICIAL, producto_id=producto.id
                ))

    if "--ocultar-otros" in sys.argv:
        nombres = [d["nombre"] for d in productos_vitalis]
        session.query(Producto).filter(Producto.nombre.notin_(nombres)).update(
            {Producto.activo: False}, synchronize_session=False
        )

    session.commit()
    print("Productos de Vitalis cargados correctamente.")

    productos_cargados = session.query(Producto).filter_by(categoria_id=categoria.id).all()
    print(f"Cantidad de productos en la categoría: {len(productos_cargados)}")
    for producto in productos_cargados:
        print(f"{producto.nombre} - ${producto.precio_base}")

except Exception as error:
    session.rollback()
    print("Ocurrió un error al cargar los productos:")
    print(error)

finally:
    session.close()
