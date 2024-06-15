<template>
  <span class="text-h5 text-neutral-black">{{ title }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageTitle',
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>
