<template>
  <q-page padding>
    <q-card flat class="column items-center">
      <q-card-section class="q-pb-none">
        <span class="text-h5 text-neutral-black">Lista de Produtos</span>
      </q-card-section>
      <q-card-section>
        <div class="column items-center q-gutter-sm">
          <div class="row q-gutter-sm">
            <q-btn
              color="primary"
              outline
              icon="las la-plus-circle"
              @click="$router.push({ name: 'new-product' })"
              no-caps
            ></q-btn>
            <q-btn
              color="neutral-grey"
              icon="las la-barcode"
              @click="$router.push({ name: 'new-product' })"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="full-width">
        <q-separator></q-separator>
      </q-card-section>
      <q-card-section class="full-width q-mb-none">
        <q-input outlined v-model="search" label="Buscar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="full-width q-pt-none">
        <div class="row q-col-gutter-sm">
          <q-infinite-scroll
            @load="getProducts"
            :offset="250"
            class="full-width"
          >
            <div class="row q-col-gutter-sm all-products">
              <div
                v-for="product in products"
                :key="product.id"
                class="col-md-4 col-lg-3 col-sm-12 col-xs-12"
              >
                <ProductCard
                  :product="product"
                  @selected-product="setProduct"
                  :style="{width: (el: any) => el.parent.offsetWidth + 'px'}"
                />
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
    <DialogProduct v-model="dialog" :product="product || {}" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProductCard from 'src/components/products/ProductCard.vue';
import useProductService from 'src/services/product.service';
import { ProductType } from 'src/types/Product.type';
import { Ref } from 'vue';
import DialogProduct from 'src/components/products/DialogProduct.vue';

export default defineComponent({
  name: 'ListPage',
  components: {
    ProductCard,
    DialogProduct,
  },
  setup() {
    const search = ref('');
    const service = useProductService();
    const products: Ref<ProductType[]> = ref([]);
    const page: Ref<number | null> = ref(null);
    const totalItems: Ref<number> = ref(0);
    const dialog: Ref<boolean> = ref(false);
    const product: Ref<ProductType | null> = ref(null);

    const getProducts = async (index: number, done: () => void) => {
      if (products.value.length >= totalItems.value && totalItems.value !== 0) {
        done();
        return;
      }
      page.value = page.value ? page.value + 1 : 1;
      const { data, meta } = await service.paginate({
        page: page.value,
      });
      totalItems.value = meta.total;
      products.value.push(...data);
      done();
    };

    const setProduct = (param: ProductType) => {
      product.value = param;
      dialog.value = true;
    };

    return {
      search,
      products,
      dialog,
      product,
      setProduct,
      getProducts,
    };
  },
});
</script>
