<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <PageTitle :title="'Editar Produto'" />
      </q-card-section>
      <q-card-section>
        <ProductForm :product-id="id" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import PageTitle from 'src/components/PageTitle.vue';
import ProductForm from 'src/components/products/ProductForm.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'EditPage',
  components: {
    ProductForm,
    PageTitle,
  },
  setup() {
    const route = useRoute();
    const id: string = route.params.id as string;
    console.log(route.params.id);
    return {
      id,
    };
  },
};
</script>
