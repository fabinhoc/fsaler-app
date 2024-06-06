<template>
  <q-card id="client-card" class="q-my-sm my-card">
    <q-card-section>
      <div class="text-h5 q-mt-sm q-mb-xs">
        {{ client.name }}
      </div>
      <div class="text-overline">
        <q-icon
          class="text-positive"
          name="headphones"
          size="14px"
          style="margin-top: -3px"
        ></q-icon>
        <a
          class="text-positive"
          :href="`https://wa.me/55${client.phone_number.replace(/\D/g, '')}`"
          target="_blank"
        >
          {{ client.phone_number }}
        </a>
      </div>
      <div class="text-overline">Desde: {{ $d(client.created_at) }}</div>
      <div class="text-caption text-grey">
        {{ client.description }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn color="info" icon="edit"></q-btn>
      <q-btn color="negative" icon="delete"></q-btn>
      <q-btn
        color="accent"
        icon="add"
        @click="$emit('selectedclient', client)"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClientCard',
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
