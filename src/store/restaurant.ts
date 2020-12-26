import { createStore, Mutator, GetState } from "vue-dfs-store";
import * as api from "../data";

type RestaurantState = {
  restaurants: api.Restaurant[];
  error: Error | undefined;
  loading: boolean;
  updating: boolean;
  deleting: boolean;
};

type RestaurantAccessors = {
  get: () => Promise<void>;
};

const accessorsCreator = (
  mutate: Mutator<RestaurantState>,
  get: GetState<RestaurantState>
): RestaurantAccessors => ({
  get: async () => {
    mutate((state) => {
      state.loading = true;
      state.error = undefined;
    });

    const resp = await api.getRestaurants();

    resp.either(
      (err) => {
        mutate((state) => {
          state.error = err;
        });
      },
      (fetchedRestaurants) => {
        mutate((state) => {
          state.restaurants = fetchedRestaurants;
        });
      }
    );

    mutate((state) => (state.loading = false));
  },
});

const restaurantStore = createStore<RestaurantState, RestaurantAccessors>({
  name: "RestaurantStore",
  initialState: {
    restaurants: [] as Array<api.Restaurant>,
    error: undefined as Error | undefined,
    loading: false,
    updating: false,
    deleting: false,
  },
  accessorsCreator,
});

export default restaurantStore;
