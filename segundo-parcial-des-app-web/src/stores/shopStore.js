import { computed, reactive } from 'vue';
import baseProducts from '../../data/productos.json';

const PRODUCTS_KEY = 'coffe-time-products';
const CART_KEY = 'coffe-time-cart';
const SESSION_KEY = 'coffe-time-session';

function getSessionUser() {
  try {
    const savedSession = localStorage.getItem(SESSION_KEY);

    if (!savedSession) {
      return null;
    }

    if (savedSession === 'true') {
      return 'Coffe';
    }

    return JSON.parse(savedSession)?.user || null;
  } catch {
    return null;
  }
}

function normalizeUserKey(user) {
  return encodeURIComponent(user.trim().toLowerCase());
}

let activeCartUser = getSessionUser();

function getCartKey() {
  return activeCartUser ? `${CART_KEY}-${normalizeUserKey(activeCartUser)}` : CART_KEY;
}

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function normalizeProducts(products) {
  return products.map((product, index) => ({
    id: Number(product.id) || Date.now() + index,
    nombre: product.nombre || 'Producto sin nombre',
    descripcion: product.descripcion || '',
    precio: Number(product.precio) || 0,
    imagen: product.imagen || `cafe${index + 1}.jpg`,
  }));
}

export const shopState = reactive({
  products: normalizeProducts(readStorage(PRODUCTS_KEY, baseProducts)),
  cart: activeCartUser ? readStorage(getCartKey(), []) : [],
});

export const cartTotal = computed(() =>
  shopState.cart.reduce((total, item) => total + item.precio * item.cantidad, 0),
);

export const cartItemsCount = computed(() =>
  shopState.cart.reduce((total, item) => total + item.cantidad, 0),
);

function persistProducts() {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(shopState.products));
}

function persistCart() {
  if (!activeCartUser) return;

  localStorage.setItem(getCartKey(), JSON.stringify(shopState.cart));
}

export function loadCartForUser(user) {
  activeCartUser = user;
  shopState.cart = activeCartUser ? readStorage(getCartKey(), []) : [];
}

export function createProduct(product) {
  const nextId = Math.max(0, ...shopState.products.map((item) => item.id)) + 1;
  shopState.products.push({
    id: nextId,
    nombre: product.nombre.trim(),
    descripcion: product.descripcion.trim(),
    precio: Number(product.precio),
    imagen: product.imagen || 'cafe1.jpg',
  });
  persistProducts();
}

export function updateProduct(product) {
  const index = shopState.products.findIndex((item) => item.id === product.id);
  if (index === -1) return;

  shopState.products[index] = {
    ...shopState.products[index],
    nombre: product.nombre.trim(),
    descripcion: product.descripcion.trim(),
    precio: Number(product.precio),
    imagen: product.imagen || shopState.products[index].imagen,
  };

  const cartItem = shopState.cart.find((item) => item.id === product.id);
  if (cartItem) {
    cartItem.nombre = product.nombre.trim();
    cartItem.precio = Number(product.precio);
  }

  persistProducts();
  persistCart();
}

export function deleteProduct(productId) {
  shopState.products = shopState.products.filter((item) => item.id !== productId);
  shopState.cart = shopState.cart.filter((item) => item.id !== productId);
  persistProducts();
  persistCart();
}

export function addToCart(product) {
  const existing = shopState.cart.find((item) => item.id === product.id);

  if (existing) {
    existing.cantidad += 1;
  } else {
    shopState.cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: 1,
    });
  }

  persistCart();
}

export function decrementCartItem(productId) {
  const item = shopState.cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;

  item.cantidad -= 1;
  if (item.cantidad <= 0) {
    removeCartItem(productId);
    return;
  }

  persistCart();
}

export function removeCartItem(productId) {
  shopState.cart = shopState.cart.filter((item) => item.id !== productId);
  persistCart();
}

export function clearCart() {
  shopState.cart = [];
  persistCart();
}
