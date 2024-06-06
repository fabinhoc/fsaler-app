<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <span class="text-h4 text-neutral-black">Criar/editar Cliente</span>
      </q-card-section>
      <q-card-section>
        <ClientForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import ClientForm from 'src/components/clients/ClientForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClientNewPage',
  components: {
    ClientForm,
  },
  setup() {
    return {};
  },
});
</script>
