<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $t('app.projectName') }}
        </q-toolbar-title>

        <q-btn icon="person" round flat></q-btn>
        <q-btn icon="logout" round flat></q-btn>
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
    icon: 'group',
    link: '/clients',
  },
  {
    title: 'Produtos',
    caption: '',
    icon: 'qr_code_scanner',
    link: '/products',
  },
  {
    title: 'Vendas',
    caption: '',
    icon: 'attach_money',
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
