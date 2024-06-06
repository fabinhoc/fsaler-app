<template>
  <q-form ref="clientForm" @submit.prevent="handleSubmit">
    <div class="row column q-col-gutter-md">
      <q-input
        v-model="v$.name.$model"
        outlined
        clearable
        :label="$t('app.client.component.clientForm.name')"
        lazy-rules
        :rules="[
          () => !v$.name.required.$invalid || $t('validations.required'),
        ]"
        :hint="$t('app.client.component.clientForm.nameHint')"
      />
      <q-input
        v-model="v$.phone_number.$model"
        outlined
        :label="$t('app.client.component.clientForm.phoneNumber')"
        lazy-rules
        mask="(##) #####-####"
        :rules="[
          () =>
            !v$.phone_number.required.$invalid || $t('validations.required'),
        ]"
        :hint="$t('app.client.component.clientForm.phoneNumberHint')"
      />
      <q-input
        v-model="v$.description.$model"
        counter
        maxlength="255"
        autogrow
        outlined
        :label="$t('app.client.component.clientForm.description')"
        :hint="$t('app.client.component.clientForm.descriptionHint')"
      />
      <q-btn
        type="submit"
        color="positive"
        :disable="v$.$invalid"
        class="full-width q-ma-sm"
        >{{ $t('app.client.component.clientForm.save') }}</q-btn
      >
      <q-btn
        @click="cancel"
        class="full-width"
        type="button"
        color="negative"
        outline
        >{{ $t('app.client.component.clientForm.cancel') }}</q-btn
      >
    </div>
  </q-form>
</template>

<script lang="ts">
import useVuelidate, { ValidationArgs } from '@vuelidate/core';
import { ClientDto } from 'src/types/dto/Client.dto';
import { Ref } from 'vue';
import { defineComponent } from 'vue';
import { required } from '@vuelidate/validators';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import useClientService from 'src/services/client.service';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ClientForm',
  setup() {
    const form: Ref<ClientDto> = ref({
      name: null,
      phone_number: null,
      description: null,
    });
    const rules: ValidationArgs<ClientDto> = {
      name: { required },
      phone_number: { required },
      description: {},
    };
    const v$ = useVuelidate(rules, form);
    const clientForm = ref();
    const router = useRouter();
    const notify = useNotify();
    const service = useClientService();
    const { t } = useI18n();

    const handleSubmit = async () => {
      try {
        await service.post(form.value);
        clear();
        notify.success(t('success'));
      } catch (error: any) {
        console.log(error);
        const message = error?.response?.data?.message ?? error;
        notify.error(message);
      }
    };

    const clear = () => {
      form.value = {
        name: null,
        phone_number: null,
        description: null,
      };
      clientForm.value.reset();
    };

    const cancel = async () => {
      clear();
      router.push({ name: 'list-clients' });
    };

    return {
      handleSubmit,
      v$,
      clientForm,
      cancel,
    };
  },
});
</script>
