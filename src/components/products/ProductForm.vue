<template>
  <q-form ref="productForm" @submit.prevent="handleSubmit">
    <q-btn
      icon="qr_code_scanner"
      color="primary"
      class="q-mb-sm"
      :class="$q.platform.is.mobile ? 'full-width' : ''"
      >Ler código de barras</q-btn
    >
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
    <q-btn
      type="submit"
      color="neutral-black"
      :disable="v$.$invalid"
      class="full-width q-ma-sm"
      >{{ $t('app.product.component.productForm.save') }}</q-btn
    >
    <q-btn
      @click="cancel"
      class="full-width"
      type="button"
      color="negative"
      outline
      >{{ $t('app.product.component.productForm.cancel') }}</q-btn
    >
  </q-form>
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
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { useI18n } from 'vue-i18n';
import { date } from 'quasar';

export default defineComponent({
  name: 'ProductForm',
  setup() {
    const categories: Ref<CategoryType[] | null> = ref(null);
    const categoryService = useCategoryService();
    const router = useRouter();
    const productForm = ref();
    const service = useProductService();
    const notify = useNotify();
    const { t } = useI18n();
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
      console.log(data);
    };

    onMounted(() => {
      getCategories();
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
        await service.post(form.value);
        clear();
        notify.success(t('success'));
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
    };
  },
});
</script>
