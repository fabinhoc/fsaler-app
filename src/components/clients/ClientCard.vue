<template>
  <q-card id="client-card" class="q-my-sm my-card">
    <div class="row">
      <q-card-section class="column justify-around items-center text-center">
        <div class="q-mb-sm">
          <q-icon
            name="las la-user"
            size="48px"
            color="neutral-l_grey"
          ></q-icon>
          <div class="column">
            <span class="text-neutral-l_grey text-body1">0</span>
            <span style="font-size: 8px">PEDIDOS</span>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 text-neutral-grey">
          <span>{{ client.name }}</span>
          <div class="column text-overline">
            <div style="margin: -4px 0px -4px 0">
              <q-icon
                class="text-positive"
                name="lab la-whatsapp"
                size="14px"
              ></q-icon>
              <a
                class="text-positive"
                :href="`https://wa.me/55${client.phone_number.replace(
                  /\D/g,
                  ''
                )}`"
                target="_blank"
              >
                {{ client.phone_number }}
              </a>
            </div>
            <span class="text-neutral-l_grey text-weight-light text-caption">{{
              client.description
            }}</span>
          </div>
          <div class="row q-gutter-xs">
            <q-btn
              color="info"
              size="sm"
              outline
              no-caps
              icon="las la-pencil-alt"
            ></q-btn>
            <q-btn
              color="negative"
              icon="lar la-trash-alt"
              size="sm"
              outline
              no-caps
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </div>
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
