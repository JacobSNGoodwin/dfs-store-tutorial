<template>
  <button
    class="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition duration-150 w-20 flex justify-center"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrimayButton",
});
</script>
