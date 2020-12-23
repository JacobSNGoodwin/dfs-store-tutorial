<template>
  <div class="flex flex-col mb-4">
    <label class="text-lg font-light italic" for="name">Restaurant Name</label>
    <input
      v-model="restaurant.name"
      class="border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 px-3 py-1 shadow-sm h-8"
      type="text"
      name="name"
    />
  </div>
  <div class="flex flex-col mb-4">
    <label class="text-lg font-light italic" for="rating"
      >Rating - <span>{{ restaurant.rating.toFixed(1) }} 🌟</span></label
    >
    <input
      v-model.number="restaurant.rating"
      class="appearance-none border rounded-lg border-gray-200 focus:outline-none py-1 shadow-sm h-4 mt-2 slider-thumb"
      type="range"
      name="rating"
      min="0"
      max="5"
      step="0.5"
    />
  </div>
  <div class="flex flex-col mb-4">
    <label class="text-lg font-light italic" for="review">Review</label>
    <textarea
      v-model="restaurant.review"
      class="border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 px-3 py-1 shadow-sm"
      rows="6"
      name="review"
    />
  </div>
  <div class="flex justify-end items-center mt-3 space-x-2">
    <PrimaryButton
      @click.stop="
        this.$emit('submit', {
          id: restaurant.id,
          name: restaurant.name,
          rating: restaurant.rating,
          review: restaurant.review,
        })
      "
    >
      {{ isEdit ? "Edit" : "Create" }}</PrimaryButton
    >
    <SecondaryButton @click.stop="this.$emit('cancel')">Cancel</SecondaryButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRaw } from "vue";
import { Restaurant } from "../data";
import { PrimaryButton, SecondaryButton } from "../components/ui";

export default defineComponent({
  name: "EditRestaurant",
  components: {
    PrimaryButton,
    SecondaryButton,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    initRestaurant: {
      type: Object as PropType<Restaurant>,
      default: () => {
        return {
          name: "",
          rating: 2.5,
          review: "",
        } as Restaurant;
      },
    },
  },
  emits: ["cancel", "submit"],
  setup(props) {
    // we need to get readonly props and assign
    // to form's reactive data, hence why we extract
    // non-reactive fields and assign to a new reactive
    // object

    // will yield -> eslintvue/no-setup-props-destructure
    // const initRestaurant = props.initRestaurant;

    const { id, name, rating, review } = toRaw(props.initRestaurant);

    const restaurant = reactive({
      id,
      name,
      rating,
      review,
    });

    return {
      restaurant,
    };
  },
});
</script>
