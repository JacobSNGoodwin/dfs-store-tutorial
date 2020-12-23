<template>
  <div
    class="relative p-4 bg-purple-600 rounded-md shadow-md hover:shadow-2xl cursor-pointer"
  >
    <div class="text-2xl font-light text-white text-center text-shadow-md">
      {{ restaurant.name }}
    </div>
    <div class="text-white text-center font-medium text-shadow">
      Rating - {{ restaurant.rating }}
    </div>
    <div class="text-white text-center font-semibold mt-4">
      {{ restaurant.review }}
    </div>
    <div
      class="transition duration-200 absolute h-8 w-8 rounded-full top-0 right-0 mt-2 mr-4 z-20 cursor-pointer hover:bg-gray-300 hover:bg-opacity-30 flex justify-center items-center"
      @click.stop="this.$emit('delete', restaurant.id)"
    >
      <div class="text-white">X</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Restaurant } from "../data/index";
export default defineComponent({
  name: "RestaurantCard",
  props: {
    restaurant: {
      type: Object as PropType<Restaurant>,
      required: true,
    },
  },
  emits: ["delete"],
});
</script>
