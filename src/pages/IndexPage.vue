<template>
  <q-page padding>
    <div
      class="justify-evenly q-gutter-md"
      :class="$q.screen.lt.sm ? 'column' : 'row'"
    >
      <div class="col">
        <InfoCard
          :title="'Clientes'"
          :icon="'las la-users'"
          :caption="'Total: 20'"
          :link="'/clients'"
        />
      </div>
      <div class="col">
        <InfoCard
          :title="'Produtos'"
          :icon="'las la-barcode'"
          :caption="'Total: 20'"
          :link="'list-products'"
        />
      </div>
      <div class="col">
        <InfoCard
          :title="'Vendas'"
          :icon="'las la-dollar-sign'"
          :caption="'Total: 20'"
          :link="'/orders'"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Todo, Meta } from 'components/models';
import InfoCard from 'components/dashboard/infoCard.vue';

export default defineComponent({
  name: 'IndexPage',

  components: {
    InfoCard,
  },

  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);

    const meta = ref<Meta>({
      totalCount: 1200,
    });

    return { todos, meta };
  },
});
</script>
