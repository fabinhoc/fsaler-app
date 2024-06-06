<template>
  <q-card tag="article" @click="goTo(link)" class="cursor-pointer touch">
    <q-card-section class="flex column items-center justify-center">
      <q-icon :name="icon" color="positive" size="48px"></q-icon>
      <span class="text-subtitle1 text-weight-bold text-neutral-grey">{{
        title
      }}</span>
      <span class="text-neutral-grey text-body-3">{{ caption }}</span>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'InfoCard',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    const goTo = (link: string) => {
      router.push({ name: link });
    };

    return {
      goTo,
    };
  },
});
</script>
