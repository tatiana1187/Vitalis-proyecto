# Vitalis+ — instalación y ejecución local

El proyecto tiene tres partes: MySQL (base de datos), Spring Boot/Kotlin (API) y React/Vite (página web). **MySQL Workbench es el programa para administrar la base; también tiene que estar iniciado el servidor MySQL local.**

## Requisitos

- MySQL Server 8 o MariaDB iniciado y accesible en `localhost:3306`.
- MySQL Workbench (para crear y consultar la base).
- Python 3.10 o superior.
- Java JDK 21.
- Node.js 20 o superior y npm.

## 1. Crear la base en MySQL Workbench

1. Abrí MySQL Workbench y conectate a tu servidor local.
2. Ejecutá este SQL:

```sql
CREATE DATABASE IF NOT EXISTS vitalis_uniformes
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

No hace falta crear las tablas a mano: el proyecto las crea al preparar la base.

## 2. Configurar y cargar la base

Abrí una terminal en la carpeta `base-de-datos`.

En Windows (PowerShell):

```powershell
Copy-Item .env.ejemplo .env
notepad .env
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
py database.py
py datos.py
```

En el archivo `.env`, completá `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` y `DB_NAME` con los datos de tu MySQL local. No compartas ni subas ese archivo.

`database.py` comprueba la conexión. `datos.py` crea las tablas que falten y carga/actualiza el catálogo de 12 productos con variantes XS a XXL. El stock inicial de 20 unidades por talle es un valor de ejemplo: cambialo en `datos.py` si no coincide con tu inventario real.

## 3. Iniciar el backend (API)

Abrí **otra** terminal en la carpeta `backend`.

En Windows PowerShell, definí la contraseña que usás en MySQL y ejecutá:

```powershell
$env:DB_USER = "root"
$env:DB_PASSWORD = "TU_CLAVE_DE_MYSQL"
$env:DB_URL = "jdbc:mariadb://localhost:3306/vitalis_uniformes"
.\mvnw.cmd spring-boot:run
```

Reemplazá `root` y `TU_CLAVE_DE_MYSQL` por tus credenciales reales. La primera ejecución puede tardar porque Maven descarga dependencias. La API queda en `http://localhost:8080`.

Para comprobar que responde, abrí `http://localhost:8080/api/productos?size=50`. Deberías recibir un JSON con los productos.

## 4. Iniciar la página web

Abrí **una tercera** terminal en la carpeta `frontend`:

```powershell
npm install
npm run dev
```

Abrí la dirección que muestra Vite, normalmente `http://localhost:5173`.

## Orden habitual para trabajar

1. Iniciar MySQL Server.
2. Ejecutar el backend.
3. Ejecutar el frontend.

La carga de datos con `datos.py` se hace una vez y se repite cuando quieras actualizar el catálogo. No borra los pedidos existentes.

## Funcionalidad y notas

- El catálogo se obtiene desde `GET /api/productos`.
- Los pedidos se registran mediante `POST /api/pedidos`.
- Al registrar un pedido se guarda/actualiza el cliente, se registra el pedido y su detalle, y se descuenta el stock de la variante seleccionada.
- Si el backend no está disponible, la web muestra el catálogo local de ejemplo; en ese modo los pedidos no se guardan.
- El formulario de contacto todavía no está conectado a un servicio de envío ni guarda mensajes; la página lo informa al usuario.
- Las credenciales reales deben permanecer en `base-de-datos/.env` o en variables de entorno. No las subas a Git ni las incluyas en ZIP compartidos.
