<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white q-pa-sm">
      <q-toolbar class="row justify-between">
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          color="neutral-grey"
        />

        <q-toolbar-title
          class="cursor-pointer"
          @click="$router.push({ name: 'dashboard' })"
        >
          <q-img src="src/assets/logo-fsaler.png" alt="logo" width="36px" />
        </q-toolbar-title>

        <div>
          <q-btn color="neutral-grey" icon="las la-user" round flat></q-btn>
          <q-btn
            color="neutral-grey"
            icon="las la-sign-out-alt"
            round
            flat
          ></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Dashboard',
    caption: '',
    icon: 'dashboard',
    link: '/',
  },
  {
    title: 'Clientes',
    caption: '',
    icon: 'las la-users',
    link: '/clients',
  },
  {
    title: 'Produtos',
    caption: '',
    icon: 'las la-barcode',
    link: '/products',
  },
  {
    title: 'Vendas',
    caption: '',
    icon: 'las la-dollar-sign',
    link: '/orders',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
