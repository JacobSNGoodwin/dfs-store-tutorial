<template>
  <div
    v-if="active"
    class="bg-opacity-0 fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
  >
    <!-- Slightly transparent gray background -->
    <div class="absolute w-full h-full bg-gray-900 bg-opacity-40"></div>
    <!-- Modal Close Button -->
    <div
      class="absolute rounded-full top-0 right-0 mt-2 mr-4 cursor-pointer hover:bg-white h-8 w-8 hover:bg-opacity-30 transition duration-200 flex justify-center items-center z-50"
      @click.stop="this.$emit('close')"
    >
      <div class="text-white">X</div>
    </div>
    <!-- Modal Container -->
    <div
      class="bg-white w-11/12 max-w-screen-md mx-auto rounded shadow-lg z-50 overflow-y-auto px-8 py-4"
    >
      <div class="text-2xl font-light text-center mb-2">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
