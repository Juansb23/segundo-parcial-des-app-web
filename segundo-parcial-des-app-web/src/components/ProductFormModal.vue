<template>
  <div class="modal-backdrop-custom">
    <section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="productFormTitle">
      <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <p class="text-uppercase small fw-semibold text-secondary mb-1">Producto</p>
          <h2 id="productFormTitle" class="h4 mb-0">{{ product ? 'Editar café' : 'Nuevo café' }}</h2>
        </div>
        <button class="btn-close" type="button" aria-label="Cerrar" @click="$emit('close')"></button>
      </div>

      <form class="row g-3" @submit.prevent="submitForm">
        <div class="col-12">
          <label class="form-label" for="productName">Nombre</label>
          <input id="productName" v-model.trim="form.nombre" class="form-control" type="text" required />
        </div>

        <div class="col-md-6">
          <label class="form-label" for="productPrice">Precio</label>
          <input id="productPrice" v-model.number="form.precio" class="form-control" type="number" min="1" required />
        </div>

        <div class="col-md-6">
          <label class="form-label" for="productImage">Imagen</label>
          <select id="productImage" v-model="form.imagen" class="form-select">
            <option v-for="image in imageOptions" :key="image" :value="image">{{ image }}</option>
          </select>
        </div>

        <div class="col-12">
          <label class="form-label" for="productDescription">Descripción</label>
          <textarea
            id="productDescription"
            v-model.trim="form.descripcion"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <div v-if="error" class="col-12">
          <div class="alert alert-warning mb-0">{{ error }}</div>
        </div>

        <div class="col-12 d-flex justify-content-end gap-2">
          <button class="btn btn-outline-secondary" type="button" @click="$emit('close')">Cancelar</button>
          <button class="btn btn-coffee" type="submit">Guardar</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'save']);
const imageOptions = Array.from({ length: 10 }, (_, index) => `cafe${index + 1}.jpg`);
const error = ref('');
const form = reactive({
  id: null,
  nombre: '',
  descripcion: '',
  precio: 0,
  imagen: 'cafe1.jpg',
});

watch(
  () => props.product,
  (product) => {
    form.id = product?.id || null;
    form.nombre = product?.nombre || '';
    form.descripcion = product?.descripcion || '';
    form.precio = product?.precio || 0;
    form.imagen = product?.imagen || 'cafe1.jpg';
    error.value = '';
  },
  { immediate: true },
);

function submitForm() {
  if (!form.nombre || !form.descripcion || Number(form.precio) <= 0) {
    error.value = 'Completa todos los campos con valores válidos.';
    return;
  }

  emit('save', { ...form, precio: Number(form.precio) });
}
</script>
