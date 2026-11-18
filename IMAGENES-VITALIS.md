# Imágenes de Vitalis+

Se agregaron imágenes locales WebP para los 12 productos, el banner principal y las cuatro secciones de presentación. Están en `frontend/public/images` y se referencian desde `frontend/src/catalogo.js`.

No hace falta configurar nada adicional: Vite sirve automáticamente los archivos de `public` desde la raíz del sitio.

Para ver los cambios, desde `frontend` ejecutá `npm run dev` (o reiniciá Vite si ya estaba abierto).

Nota: el archivo `.env` con credenciales locales no se incluye en este ZIP por seguridad. Conservá tu `.env` local; si no lo tenés, crealo a partir de `.env.ejemplo` y completá tus datos. Tampoco se incluyen `node_modules`, `.venv` ni `target`; se regeneran con los pasos de instalación habituales.
