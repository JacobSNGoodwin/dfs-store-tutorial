<template>
  <div class="container mx-auto px-8">
    <div class="flex text-center mt-6 justify-center">
      <div class="text-4xl font-black text-gray-800">My Restaurant List</div>
    </div>
    <Loader
      :style="{
        visibility: state.loading || state.updating ? 'visible' : 'hidden',
      }"
      class="mt-6"
      color="#A78BFA"
    />
    <SecondaryButton class="mx-auto mt-4" @click="setShowModal(true)"
      >Add</SecondaryButton
    >
    <!-- <div
      v-if="state.error"
      class="my-2 text-red-500 mx-auto text-center font-semibold text-lg"
    >
      {{ `error goes here!` }}
    </div> -->
    <RestaurantList :restaurants="sortedRestaurants" />
    <Modal
      :active="showModal"
      title="New Restaurant"
      submit-title="Add"
      @close="setShowModal(false)"
    >
      <EditRestaurant
        @submit="createRestaurant"
        @cancel="setShowModal(false)"
      />
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import restaurantStore from "./store/restaurant";
import { useStore } from "vue-dfs-store";
import { Loader, Modal } from "./components/ui";
import RestaurantList from "./components/RestaurantList.vue";
import EditRestaurant from "./components/EditRestaurant.vue";
import { SecondaryButton } from "./components/ui";
import { Restaurant } from "./data";

export default defineComponent({
  name: "App",
  components: {
    Loader,
    Modal,
    RestaurantList,
    SecondaryButton,
    EditRestaurant,
  },
  setup() {
    const showModal = ref(false);
    const { state, accessors } = useStore(restaurantStore);

    onMounted(async () => {
      accessors.get();
    });

    const setShowModal = (show: boolean) => {
      showModal.value = show;
    };

    const createRestaurant = async (newRestaurant: Restaurant) => {
      await accessors.create(newRestaurant);
      showModal.value = false;
    };

    const sortedRestaurants = computed(() => accessors.sorted());

    return {
      createRestaurant,
      setShowModal,
      showModal,
      state,
      sortedRestaurants,
    };
  },
});
</script>
