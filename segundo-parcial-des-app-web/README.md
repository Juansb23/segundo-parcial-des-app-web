# Coffe Time

Aplicación web modular y responsiva desarrollada con Vue.js, Vue Router y Bootstrap CSS. El proyecto simula una tienda de cafetería donde el usuario puede iniciar sesión, administrar productos y gestionar un carrito de compras.

## Tecnologías

- Vue.js 3
- Vite
- Vue Router
- Bootstrap CSS
- JavaScript
- JSON
- localStorage

## Funcionalidades

- Login educativo con credenciales iniciales.
- Registro de nuevos usuarios desde la pantalla de acceso.
- Protección de rutas internas.
- Catálogo dinámico de productos de cafetería.
- CRUD completo de productos:
  - Crear productos.
  - Listar productos.
  - Editar productos.
  - Eliminar productos.
- Carrito de compras:
  - Agregar productos.
  - Aumentar cantidades.
  - Disminuir cantidades.
  - Eliminar productos del carrito.
  - Calcular total.
  - Simular compra.
- Persistencia de datos en el navegador usando localStorage.
- Diseño responsivo con Bootstrap CSS.
- Componentes reutilizables para navegación, encabezado, pie de página, tarjetas, formulario modal y carrito.

## Credenciales de prueba

```txt
Usuario: Coffe
Contraseña: 2026
```

También puedes crear una cuenta nueva desde la opción `Crear una cuenta nueva` en la pantalla de inicio de sesión.

## Estructura principal

```txt
src/
  components/
  router/
  stores/
  utils/
  views/
  App.vue
  main.js
  styles.css
data/
  productos.json
images/
img/
```

## Comandos

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Generar versión de producción:

```bash
npm run build
```

## Datos

Los productos base se cargan desde `data/productos.json`. Después de modificar, crear o eliminar productos, la aplicación guarda los cambios en `localStorage`.

El carrito y la sesión también se guardan en `localStorage`, por lo que la información permanece disponible aunque se recargue la página.
