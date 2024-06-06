<template>
  <q-page padding>
    <q-card flat class="column items-center">
      <q-card-section class="q-pb-none">
        <span class="text-h5 text-neutral-black">Lista de Clientes</span>
      </q-card-section>
      <q-card-section>
        <q-btn
          color="primary"
          outline
          icon="las la-user-plus"
          @click="$router.push({ name: 'new-client' })"
          no-caps
        ></q-btn>
      </q-card-section>
      <q-card-section class="full-width">
        <q-separator></q-separator>
      </q-card-section>
      <q-card-section class="full-width">
        <div class="row">
          <q-infinite-scroll
            @load="getClients"
            :offset="250"
            class="full-width"
          >
            <div class="row q-col-gutter-sm all-clients">
              <div
                v-for="client in clients"
                :key="client.id"
                class="col-md-4 col-lg-3 col-sm-12 col-xs-12"
              >
                <ClientCard :client="client" />
              </div>
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Ref } from 'vue';
import useClientService from 'src/services/client.service';
import { ClientType } from 'src/types/Client.type';
import ClientCard from 'src/components/clients/ClientCard.vue';

export default defineComponent({
  name: 'ClientListPage',
  components: {
    ClientCard,
  },
  setup() {
    const search = ref('');
    const service = useClientService();
    const clients: Ref<ClientType[]> = ref([]);
    const page: Ref<number | null> = ref(null);
    const totalItems: Ref<number> = ref(0);
    const dialog: Ref<boolean> = ref(false);
    const client: Ref<ClientType | null> = ref(null);

    const getClients = async (index: number, done: () => void) => {
      if (clients.value.length >= totalItems.value && totalItems.value !== 0) {
        done();
        return;
      }
      page.value = page.value ? page.value + 1 : 1;
      const { data, meta } = await service.paginate({
        page: page.value,
      });
      totalItems.value = meta.total;
      clients.value.push(...data);
      done();
    };

    const setClient = (param: ClientType) => {
      client.value = param;
      dialog.value = true;
    };

    return {
      search,
      clients,
      dialog,
      client,
      setClient,
      getClients,
    };
  },
});
</script>
