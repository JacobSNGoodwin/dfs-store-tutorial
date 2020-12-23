<template>
  <div class="container mx-auto px-8">
    <div class="flex text-center mt-6 justify-center">
      <div class="text-4xl font-black text-gray-800">My Restaurant List</div>
    </div>
    <Loader
      :style="{
        visibility: loading ? 'visible' : 'hidden',
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
import { Loader, Modal } from "./components/ui";
import RestaurantList from "./components/RestaurantList.vue";
import EditRestaurant from "./components/EditRestaurant.vue";
import { SecondaryButton } from "./components/ui";
import { Restaurant, getRestaurants } from "./data";

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
    const restaurants = ref<Restaurant[]>([]);
    const loading = ref(false);
    const error = ref<Error | undefined>(undefined);

    onMounted(async () => {
      error.value = undefined;
      loading.value = true;
      const restaurantsOrError = await getRestaurants();

      restaurantsOrError.either(
        (fetchedError) => {
          error.value = fetchedError;
        },
        (fetchedRestaurants) => {
          restaurants.value = fetchedRestaurants;
        }
      );

      loading.value = false;
    });

    const setShowModal = (show: boolean) => {
      showModal.value = show;
    };

    const createRestaurant = async (newRestaurant: Restaurant) => {
      console.log("creating a new restaurant: ", newRestaurant);
      showModal.value = false;
    };

    const sortedRestaurants = computed(() =>
      restaurants.value.sort((a, b) => (a.name < b.name ? -1 : 1))
    );

    return {
      createRestaurant,
      setShowModal,
      showModal,
      loading,
      sortedRestaurants,
    };
  },
});
</script>
