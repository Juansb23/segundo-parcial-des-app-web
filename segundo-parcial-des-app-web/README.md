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


## Integrantes

Juan Sebastian Bayona Peñaranda - 0192611
Andres Felipe Carrascal Avendaño - 0192631


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

## Modularización

La aplicación fue organizada de manera modular para facilitar el mantenimiento y reutilización del código.

### Components
Contiene componentes reutilizables como:
- Header
- Footer
- Navegación
- Tarjetas de productos
- Modal de formularios
- Elementos del carrito

### Views
Representan las páginas principales:
- Login
- Productos
- Carrito

### Stores
Gestionan el estado global de:
- Autenticación
- Carrito y productos

### Router
Controla la navegación y protección de rutas.


## Comunicación entre componentes

La comunicación entre componentes se implementó utilizando:

- Props para enviar información desde componentes padre hacia hijos.
- Emits para enviar eventos desde componentes hijos hacia padres.
- Stores para compartir estado global entre múltiples componentes.


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


## Consumo de datos

Los productos se cargan desde:

data/productos.json

La aplicación simula el consumo de una API externa utilizando archivos JSON y persistencia en localStorage.


## Datos

Los productos base se cargan desde `data/productos.json`. Después de modificar, crear o eliminar productos, la aplicación guarda los cambios en `localStorage`.

El carrito y la sesión también se guardan en `localStorage`, por lo que la información permanece disponible aunque se recargue la página.


## Trabajo colaborativo

Se utilizó Git y GitHub para el control de versiones del proyecto mediante commits por parte de los 2 integrantes.