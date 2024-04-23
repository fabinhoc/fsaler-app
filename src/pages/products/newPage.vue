<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <span class="text-h4 text-neutral-black">Criar/editar Produto</span>
      </q-card-section>
      <q-card-section>
        <ProductForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import ProductForm from 'src/components/products/ProductForm.vue';

export default {
  name: 'NewPage',
  components: {
    ProductForm,
  },
  setup() {
    return {};
  },
};
</script>
