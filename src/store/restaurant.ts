import { AccessorFunc, createStore } from "vue-dfs-store";
import * as api from "../data";

type RestaurantState = {
  restaurants: api.Restaurant[];
  error: Error | undefined;
  loading: boolean;
  updating: boolean;
  deleting: boolean;
};

type RestaurantAccessors = Record<string, AccessorFunc>;

const restaurantStore = createStore<RestaurantState, RestaurantAccessors>({
  name: "RestaurantStore",
  initialState: {
    restaurants: [] as Array<api.Restaurant>,
    error: undefined as Error | undefined,
    loading: false,
    updating: false,
    deleting: false,
  },
  accessorsCreator: () => ({}),
});

export default restaurantStore;
