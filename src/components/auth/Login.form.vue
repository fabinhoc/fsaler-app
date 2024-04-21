<template>
  <q-form ref="myForm" class="q-gutter-y-lg" @submit.prevent="handleSubmit">
    <q-input
      v-model="v$.email.$model"
      :label="$t('app.auth.component.formLogin.email')"
      lazy-rules
      :rules="[
        () => !v$.email.required.$invalid || $t('validations.required'),
        () => !v$.email.email.$invalid || $t('validations.email'),
      ]"
    />
    <q-input
      v-model="v$.password.$model"
      :type="isPwd ? 'password' : 'text'"
      :label="$t('app.auth.component.formLogin.password')"
      lazy-rules
      :rules="[
        () => !v$.password.required.$invalid || $t('validations.required'),
      ]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="handlePwd"
        />
      </template>
    </q-input>
    <q-btn
      type="submit"
      :label="$t('app.auth.component.formLogin.login')"
      outline
      rounded
      class="full-width"
      color="primary"
      :disable="v$.$invalid"
    />
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { LoginDto } from 'src/types/dto/Login.dto';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useAuthService from 'src/services/auth.service';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'FormLogin',
  setup() {
    const form: Ref<LoginDto> = ref({
      email: null,
      password: null,
    });
    const isPwd: Ref<boolean> = ref(true);
    const rules = {
      email: { email, required },
      password: { required },
    };
    const v$ = useVuelidate(rules, form);
    const service = useAuthService();
    const router = useRouter();
    const notify = useNotify();

    const handlePwd = () => {
      isPwd.value = !isPwd.value;
    };

    const handleSubmit = async () => {
      try {
        const validate = await v$.value.$validate();
        if (!validate) return false;
        await service.login(form.value);
        await router.push({ name: 'dashboard' });
      } catch (error: unknown) {
        notify.error(error as string);
      }
    };
    return {
      form,
      v$,
      isPwd,
      handlePwd,
      handleSubmit,
    };
  },
});
</script>
