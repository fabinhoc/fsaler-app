<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <PageTitle :title="'Criar/Editar cliente'" />
      </q-card-section>
      <q-card-section>
        <ClientForm />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import PageTitle from 'src/components/PageTitle.vue';
import ClientForm from 'src/components/clients/ClientForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClientNewPage',
  components: {
    ClientForm,
    PageTitle,
  },
  setup() {
    return {};
  },
});
</script>
