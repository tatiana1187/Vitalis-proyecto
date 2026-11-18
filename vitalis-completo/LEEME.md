# Vitalis+ — cómo ponerlo a correr

Orden: base de datos, backend y después la página.

## 1. Base de datos (Python)
1. Copiá tu archivo `.env` a `base-de-datos/` (no lo incluí para no mover tus contraseñas; hay un `.env.ejemplo`).
2. `pip install -r requirements.txt`
3. `python datos.py` (opcional: `python datos.py --ocultar-otros` para ocultar los productos de prueba)

Esto crea lo que falte (incluida la columna `pedidos.comentarios`), carga los 12 ambos y les crea una variante por talle (XS a XXL, stock 20).

## 2. Backend (Kotlin)
1. Copiá tu `application-lab.properties` a `backend/src/main/resources/` (tampoco lo incluí).
2. `./mvnw spring-boot:run` (corre en el puerto 8080).

## 3. Página (React)
En `frontend/`: `npm install` y `npm run dev`. Abrí http://localhost:5173

## Qué se guarda cuando alguien compra
- `clientes`: nombre, email, teléfono y dirección (si ya existe ese email, se actualiza el cliente).
- `pedidos`: fecha, estado "pendiente", total y comentarios.
- `detalle_pedido`: cantidad y precio unitario, vinculados a la variante (producto y talle). El stock del talle se descuenta.
