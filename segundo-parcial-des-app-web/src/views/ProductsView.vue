<template>
  <section class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <p class="text-uppercase small fw-semibold text-secondary mb-1">Catalogo</p>
        <h2 class="h3 mb-0">Nuestros productos</h2>
      </div>
      <button v-if="canManageProducts" class="btn btn-coffee" type="button" @click="openCreateModal">
        Nuevo producto
      </button>
    </div>

    <div v-if="alertMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ alertMessage }}
      <button class="btn-close" type="button" aria-label="Cerrar" @click="alertMessage = ''"></button>
    </div>

    <div class="row g-4">
      <div v-for="product in shopState.products" :key="product.id" class="col-12 col-sm-6 col-xl-4">
        <ProductCard
          :product="product"
          :can-manage="canManageProducts"
          @add="handleAddToCart"
          @edit="openEditModal"
          @delete="confirmDelete"
        />
      </div>
    </div>

    <ProductFormModal
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
      @save="saveProduct"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import ProductFormModal from '../components/ProductFormModal.vue';
import { isAdmin } from '../stores/authStore';
import { addToCart, createProduct, deleteProduct, shopState, updateProduct } from '../stores/shopStore';

const isModalOpen = ref(false);
const selectedProduct = ref(null);
const alertMessage = ref('');
const canManageProducts = computed(() => isAdmin());

function openCreateModal() {
  if (!canManageProducts.value) return;

  selectedProduct.value = null;
  isModalOpen.value = true;
}

function openEditModal(product) {
  if (!canManageProducts.value) return;

  selectedProduct.value = { ...product };
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  selectedProduct.value = null;
}

function saveProduct(product) {
  if (!canManageProducts.value) return;

  if (product.id) {
    updateProduct(product);
    alertMessage.value = 'Producto actualizado correctamente.';
  } else {
    createProduct(product);
    alertMessage.value = 'Producto creado correctamente.';
  }

  closeModal();
}

function handleAddToCart(product) {
  addToCart(product);
  alertMessage.value = `${product.nombre} agregado al carrito.`;
}

function confirmDelete(product) {
  if (!canManageProducts.value) return;

  const shouldDelete = window.confirm(`Eliminar ${product.nombre}? Tambien se quitara del carrito.`);
  if (!shouldDelete) return;

  deleteProduct(product.id);
  alertMessage.value = 'Producto eliminado correctamente.';
}
</script>
