<template>
  <q-dialog
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
    class="q-pa-none"
    :maximized="$q.screen.lt.sm"
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
      <q-img :src="image" :alt="sanitizeText(product.name)" />
      <q-card-section>
        <div class="text-overline text-orange-9">
          {{ product.category.name }}
        </div>
        <div class="text-h5 q-mt-sm">
          {{ product.name }}
        </div>
        <div>
          <span class="text-caption q-mt-sm q-mb-xs text-neutral-grey">
            {{ product.ean }}
          </span>
        </div>
        <div class="q-mt-sm">
          <span
            class="text-overline"
            :class="
              product.inventory.quantity > 0 ? 'text-shade-100' : 'warning'
            "
            >{{ product.inventory.quantity }} em estoque</span
          >
        </div>

        <div class="text-caption q-mt-sm">
          Preço de custo:
          {{ $n(parseFloat(product.cost_price), 'currency') }}
        </div>
        <div class="text-caption">
          Preço de venda: {{ $n(parseFloat(product.price), 'currency') }}
        </div>
        <div class="text-caption">
          Data da compra: {{ $d(new Date(product.purchase_date)) }}
        </div>
        <div class="text-caption text-grey q-mt-sm">
          {{ product.description }}
        </div>
      </q-card-section>
      <q-card-section class="row q-gutter-sm justify-start">
        <q-btn
          @click="
            $router.push({ name: 'edit-product', params: { id: product.uuid } })
          "
          color="info"
          outline
          no-caps
          icon="las la-pencil-alt"
        ></q-btn>
        <q-btn color="negative" icon="lar la-trash-alt" outline no-caps></q-btn>
      </q-card-section>
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
    const image: ComputedRef<string> = computed(() =>
      props.product.image
        ? `${process.env.BUCKET_IMAGE}/${props.product.image}`
        : '/src/assets/no-image.webp'
    );

    const sanitizeText = (value: string) => {
      value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      value = value.replace(/\s+/g, '-');
      value = value.toLowerCase();

      return value;
    };
    return {
      image,
      sanitizeText,
    };
  },
});
</script>
