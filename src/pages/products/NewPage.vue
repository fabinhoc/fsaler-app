<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <PageTitle :title="'Novo Produto'" />
      </q-card-section>
      <q-card-section>
        <ProductForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import PageTitle from 'src/components/PageTitle.vue';
import ProductForm from 'src/components/products/ProductForm.vue';

export default {
  name: 'NewPage',
  components: {
    ProductForm,
    PageTitle,
  },
  setup() {
    return {};
  },
};
</script>
