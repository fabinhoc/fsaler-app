<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #f5f6f8">
    <q-header elevated>
      <q-toolbar class="bg-primary q-pa-md" dark>
        <q-toolbar-title>
          <span class="text-uppercase text-subtitle2">
            {{ $t('app.projectName') }}
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginLayout',

  components: {},

  setup() {
    return {};
  },
});
</script>
