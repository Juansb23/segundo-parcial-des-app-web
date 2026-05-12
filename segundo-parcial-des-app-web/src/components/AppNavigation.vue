<template>
  <nav class="app-navigation navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid flex-lg-column align-items-lg-stretch">
      <RouterLink class="navbar-brand fw-bold" to="/">Coffe Time</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        aria-controls="mainNavigation"
        :aria-expanded="isOpen"
        aria-label="Abrir navegación"
        @click="isOpen = !isOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNavigation" class="collapse navbar-collapse flex-lg-column" :class="{ show: isOpen }">
        <div class="navbar-nav w-100 gap-lg-2 mt-3 mt-lg-4">
          <RouterLink class="nav-link" to="/" @click="isOpen = false">Productos</RouterLink>
          <RouterLink class="nav-link d-flex justify-content-between align-items-center" to="/carrito" @click="isOpen = false">
            <span>Carrito</span>
            <span class="badge rounded-pill text-bg-light">{{ cartItemsCount }}</span>
          </RouterLink>
        </div>
        <button class="btn btn-outline-light mt-lg-auto mt-3" type="button" @click="handleLogout">
          Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { logout } from '../stores/authStore';
import { cartItemsCount } from '../stores/shopStore';

const router = useRouter();
const isOpen = ref(false);

function handleLogout() {
  logout();
  isOpen.value = false;
  router.push({ name: 'login' });
}
</script>
