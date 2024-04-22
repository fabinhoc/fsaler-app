<template>
  <q-card flat class="row column items-start q-gutter-sm">
    <q-card-section>
      <span class="text-h4 text-neutral-black">Lista de Produtos</span>
    </q-card-section>
    <q-card-section class="row full-width">
      <div class="col-12 q-gutter-sm">
        <q-btn
          color="primary"
          icon="add"
          @click="$router.push({ name: 'new-product' })"
        ></q-btn>
        <q-btn
          color="neutral-grey"
          icon="qr_code_scanner"
          @click="$router.push({ name: 'new-product' })"
        ></q-btn>
        <q-input outlined v-model="search" label="Buscar..." dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ListPage',
  setup() {
    const search = ref('');
    return {
      search,
    };
  },
});
</script>
