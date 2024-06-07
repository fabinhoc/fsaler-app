<template>
  <q-card id="product-card" class="q-my-sm my-card">
    <q-img :src="image" :alt="sanitizeText(product.name)" />
    <q-card-section>
      <div class="text-overline text-orange-9">{{ product.category.name }}</div>
      <div class="text-h5 q-mt-sm q-mb-sm">{{ product.name }}</div>
      <span class="text-overline text-shade-100"
        >{{ product.inventory.quantity }} em estoque</span
      >
      <div class="text-subtitle2 text-positive" style="margin-top: -8px">
        {{ $n(parseFloat(product.price), 'currency') }}
      </div>
      <div class="text-caption text-grey q-mt-md">
        {{ product.description }}
      </div>
    </q-card-section>
    <q-card-section>
      <q-btn
        color="accent"
        size="md"
        outline
        no-caps
        icon="las la-plus"
        @click="$emit('selectedProduct', product)"
        class="full-width"
        >Detalhes
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { ProductType } from 'src/types/Product.type';
import { Ref } from 'vue';
import { ComputedRef } from 'vue';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const selectedProduct: Ref<ProductType | null> = ref(null);

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
      selectedProduct,
      sanitizeText,
      image,
    };
  },
});
</script>

<style lang="css" scoped>
.my-card {
  width: 100%;
}
</style>
