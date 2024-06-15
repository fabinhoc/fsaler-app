<template>
  <q-form ref="productForm" @submit.prevent="handleSubmit">
    <q-btn
      outline
      color="primary"
      class="q-mb-sm full-width q-mb-lg"
      :class="$q.platform.is.mobile ? 'full-width' : ''"
      @click="dialog = true"
    >
      <div class="colum">
        <q-icon name="las la-barcode"></q-icon>
        <p>Ler código de barras</p>
      </div>
    </q-btn>

    <span class="text-body-4 text-neutral-l_grey">
      # Informações do produto
    </span>
    <q-separator
      :spaced="false"
      inset
      class="q-mb-md q-mx-none q-pt-none"
      size="1"
    />

    <div class="row column q-col-gutter-md">
      <q-input
        v-model="v$.name.$model"
        outlined
        clearable
        :label="$t('app.product.component.productForm.name')"
        lazy-rules
        :rules="[
          () => !v$.name.required.$invalid || $t('validations.required'),
        ]"
        :hint="$t('app.product.component.productForm.nameHint')"
      />
      <q-input
        v-model="v$.ean.$model"
        clearable
        outlined
        :label="$t('app.product.component.productForm.ean')"
        lazy-rules
        :rules="[() => !v$.ean.required.$invalid || $t('validations.required')]"
        :hint="$t('app.product.component.productForm.eanHint')"
      >
        <template v-slot:prepend>
          <q-icon name="qr_code_scanner" />
        </template>
      </q-input>

      <q-select
        v-if="categories"
        v-model="v$.category_id.$model"
        outlined
        use-input
        input-debounce="0"
        :label="$t('app.product.component.productForm.category')"
        :options="categories"
        behavior="menu"
        option-label="name"
        option-value="id"
        emit-value
        map-options
        @filter="filterFn"
        clearable
        :rules="[
          () => !v$.category_id.required.$invalid || $t('validations.required'),
        ]"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              {{ $t('app.product.component.productForm.noResults') }}
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input
        v-model="v$.price.$model"
        outlined
        :label="$t('app.product.component.productForm.price')"
        lazy-rules
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        :rules="[
          () => !v$.price.required.$invalid || $t('validations.required'),
        ]"
      />
      <q-input
        v-model="v$.cost_price.$model"
        outlined
        :label="$t('app.product.component.productForm.costPrice')"
        lazy-rules
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        :rules="[
          () => !v$.cost_price.required.$invalid || $t('validations.required'),
        ]"
        :hint="$t('app.product.component.productForm.costPriceHint')"
      />
      <q-input
        v-model="v$.description.$model"
        counter
        maxlength="255"
        autogrow
        outlined
        :label="$t('app.product.component.productForm.description')"
        :hint="$t('app.product.component.productForm.descriptionHint')"
      />

      <span class="text-body-4 text-neutral-l_grey q-mt-lg">
        # Controle de estoque
      </span>
      <q-separator :spaced="false" inset class="q-pt-none" size="1" />

      <q-input
        v-model="v$.purchase_date.$model"
        outlined
        :mask="'##/##/####'"
        :label="$t('app.product.component.productForm.purchaseDate')"
        lazy-rules
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="v$.purchase_date.$model" :mask="'DD/MM/YYYY'">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        v-model="v$.quantity.$model"
        type="number"
        outlined
        :label="$t('app.product.component.productForm.quantity')"
      />
    </div>
    <div class="column q-mt-xl q-gutter-sm">
      <q-btn
        type="submit"
        color="positive"
        outline
        :disable="v$.$invalid"
        no-caps
        >{{ $t('app.product.component.productForm.save') }}</q-btn
      >
      <q-btn @click="cancel" type="button" color="negative" outline no-caps>{{
        $t('app.product.component.productForm.cancel')
      }}</q-btn>
    </div>
  </q-form>
  <QRCodeDialog v-model="dialog" :init="dialog" @setCode="setCode" />
</template>

<script lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { defineComponent } from 'vue';
import { ProductDto } from 'src/types/dto/Product.dto';
import { required, decimal } from '@vuelidate/validators';
import useVuelidate, { ValidationArgs } from '@vuelidate/core';
import { CategoryType } from 'src/types/Category.type';
import useCategoryService from 'src/services/category.service';
import useProductService from 'src/services/product.service';
import { useRoute, useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import { date } from 'quasar';
import QRCodeDialog from 'src/components/QRCodeDialog.vue';

export default defineComponent({
  name: 'ProductForm',
  components: {
    QRCodeDialog,
  },
  props: {
    productId: {
      required: false,
      type: String,
    },
  },
  setup(props) {
    const categories: Ref<CategoryType[] | null> = ref(null);
    const categoryService = useCategoryService();
    const router = useRouter();
    const route = useRoute();
    const productForm = ref();
    const service = useProductService();
    const notify = useNotify();
    const { t } = useI18n();
    const dialog: Ref<boolean> = ref(false);
    const updateData: Ref<boolean> = ref(false);
    const uuid: Ref<number | string> = ref('');
    const form: Ref<ProductDto> = ref({
      name: null,
      ean: null,
      category_id: null,
      price: 0,
      cost_price: 0,
      description: null,
      purchase_date: null,
      quantity: 1,
    });
    const rules: ValidationArgs<ProductDto> = {
      name: { required },
      ean: { required },
      category_id: { required },
      price: { required, decimal },
      cost_price: { required, decimal },
      description: {},
      purchase_date: {},
      quantity: {},
    };
    const v$ = useVuelidate(rules, form);

    const getCategories = async () => {
      const { data } = await categoryService.all();
      categories.value = data;
    };

    onMounted(() => {
      getCategories();
      if (props.productId) setData();
    });

    const filterFn = (val: string, update: any) => {
      if (val === '') {
        update(async () => {
          await getCategories();
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        if (categories.value) {
          categories.value = categories.value.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };

    const clear = () => {
      form.value = {
        name: null,
        ean: null,
        category_id: null,
        price: 0,
        cost_price: 0,
        description: null,
        purchase_date: null,
        quantity: 1,
      };
      productForm.value.reset();
    };

    const cancel = async () => {
      clear();
      router.push({ name: 'list-products' });
    };

    const handleSubmit = async () => {
      try {
        const purchaseDate = form.value.purchase_date;
        form.value.purchase_date = purchaseDate
          ? date.formatDate(purchaseDate, 'yyyy-mm-dd')
          : null;
        if (!updateData.value) {
          await service.post(form.value);
          clear();
        } else {
          const id = (route.params.id as string) || uuid.value;
          await service.put(id, form.value);
          router.push({ name: 'list-products' });
        }
        notify.success(t('success'));
      } catch (error: any) {
        console.log(error);
        const message = error?.response?.data?.message ?? error;
        notify.error(message);
      }
    };

    const setCode = async (code: string) => {
      form.value.ean = code;
      const data = await service.findByEan(code);
      if (data) {
        form.value = data;
        form.value.quantity = data.inventory.quantity;
        form.value.category_id = data.category.id;
        updateData.value = true;
        uuid.value = data.uuid;
      }
    };

    const setData = async () => {
      try {
        if (!props.productId) return;
        const id: string = props.productId;
        const { data } = await service.findById(id);
        updateData.value = true;
        form.value = {
          name: data.name,
          ean: data.ean,
          category_id: data.category.id,
          price: data.price,
          cost_price: data.cost_price,
          description: data.description,
          purchase_date: data.purchase_date,
          quantity: data.inventory.quantity,
        };
      } catch (error: any) {
        console.log(error);
        const message = error?.response?.data?.message ?? error;
        notify.error(message);
      }
    };

    return {
      form,
      v$,
      categories,
      filterFn,
      cancel,
      handleSubmit,
      productForm,
      dialog,
      setCode,
    };
  },
});
</script>

<style type="scss">
#card {
  background-color: rgba(38, 50, 56, 0.9);
}
</style>
