<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    class="q-pa-none"
    :maximized="$q.platform.is.mobile"
  >
    <q-card>
      <q-card-section class="q-pa-none bg-white q-ma-none full-width">
        <div class="full-width bg-white">
          <q-bar>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
        </div>
      </q-card-section>
      <img :src="image" alt="product-image" />
      <q-card-section>
        <div class="text-overline text-orange-9">
          {{ product.category.name }}
        </div>
        <div class="text-h5 q-mt-sm">
          {{ product.name }}
          <span class="text-caption q-mt-sm q-mb-xs text-neutral-grey">
            | {{ product.ean }}</span
          >
        </div>
        <span
          class="text-overline"
          :class="product.inventory.quantity > 0 ? 'text-shade-100' : 'warning'"
          >{{ product.inventory.quantity }} em estoque</span
        >

        <div class="text-caption">
          Preço de custo:
          {{ $n(parseFloat(product.cost_price), 'currency') }}
        </div>
        <div class="text-caption">
          Preço de venda: {{ $n(parseFloat(product.price), 'currency') }}
        </div>
        <div class="text-caption">
          Data da compra: {{ $d(new Date(product.purchase_date)) }}
        </div>
        <div class="text-caption text-grey q-my-sm">
          {{ product.description }}
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn color="info" icon="edit"></q-btn>
        <q-btn color="negative" icon="delete"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { ComputedRef } from 'vue';
import { computed } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogProduct',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const image: ComputedRef = computed(
      () => `${process.env.BUCKET_IMAGE}/${props.product.image}`
    );
    return {
      image,
    };
  },
});
</script>
