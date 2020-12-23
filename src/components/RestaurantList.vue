<template>
  <div class="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <RestaurantCard
      v-for="r in restaurants"
      :key="r.id"
      :restaurant="r"
      @click="editRestaurant(r.id)"
      @delete="deleteRestaurant"
    />
  </div>
  <Modal
    :active="showModal"
    title="Edit Restaurant"
    submit-title="Edit"
    @submit="updateRestaurant"
    @close="setShowModal(false)"
  >
    <EditRestaurant
      is-edit
      :init-restaurant="selectedRestaurant"
      @submit="updateRestaurant"
      @cancel="setShowModal(false)"
    />
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";

import { Restaurant } from "../data/index";
import RestaurantCard from "./RestaurantCard.vue";
import EditRestaurant from "./EditRestaurant.vue";
import { Modal } from "../components/ui";

export default defineComponent({
  name: "RestaurantList",
  components: {
    RestaurantCard,
    EditRestaurant,
    Modal,
  },
  props: {
    restaurants: {
      type: Array as PropType<Restaurant[]>,
      required: true,
    },
  },
  setup(props) {
    const selectedRestaurantId = ref<number>(0);
    const showModal = ref<boolean>(false);

    const setShowModal = (show: boolean) => {
      showModal.value = show;
    };

    const deleteRestaurant = (id: number) => {
      console.log("deleting restaurant with id: ", id);
    };

    const updateRestaurant = (restaurant: Restaurant) => {
      console.log("Updating restaurant: ", restaurant);
      setShowModal(false);
    };

    const editRestaurant = (id?: number) => {
      if (!id) {
        return;
      }
      selectedRestaurantId.value = id;
      setShowModal(true);
    };

    const selectedRestaurant = computed(() =>
      props.restaurants.find((r) => r.id === selectedRestaurantId.value)
    );

    return {
      deleteRestaurant,
      editRestaurant,
      selectedRestaurant,
      setShowModal,
      showModal,
      updateRestaurant,
    };
  },
});
</script>
