<template>
  <q-page class="row items-center justify-evenly" align="center">
    <div class="col-md-3 col-sm-6 col-xs-10">
      <FormLogin />
      <div class="q-mt-lg">
        <!-- <q-btn to="/auth/forgot-password" color="accent" flat>{{
          $t('app.auth.page.login.forgotPassword')
        }}</q-btn>
        <q-btn to="/auth/register" color="negative" flat>{{
          $t('app.auth.page.login.createAccount')
        }}</q-btn> -->
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormLogin from 'src/components/auth/Login.form.vue';

export default defineComponent({
  name: 'LoginPage',
  components: { FormLogin },
});
</script>

<style scoped></style>
