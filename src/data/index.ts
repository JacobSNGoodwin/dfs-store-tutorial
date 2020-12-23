import { Either, Left, Right } from "purify-ts";

export interface Restaurant {
  id?: number;
  name: string;
  rating: number;
  review: string;
}

export type ResponseOrError<T> = Either<Error, T>;

const apiURL = "http://localhost:8000/restaurants";

export const getRestaurants = async (): Promise<
  ResponseOrError<Restaurant[]>
> => {
  return await doRequest<Restaurant[]>(apiURL, {
    method: "GET",
  });
};

// json-server returns entire posted resource
export const createRestaurant = async (
  newRestaurant: Restaurant
): Promise<ResponseOrError<Restaurant>> => {
  return await doRequest<Restaurant>(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRestaurant),
  });
};

export const updateRestaurant = async (
  restaurant: Restaurant
): Promise<ResponseOrError<Restaurant>> => {
  console.log("Restaurant to put: ", restaurant);
  return await doRequest<Restaurant>(`${apiURL}/${restaurant.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restaurant),
  });
};

export const deleteRestaurant = async (
  id: number
): Promise<ResponseOrError<unknown>> => {
  return await doRequest<Restaurant>(`${apiURL}/${id}`, {
    method: "DELETE",
  });
};

// A generic request function which handles
// network vs 400/500 type errors
// returning a plain old error in either case
// resposne wrapped in functional Either type
const doRequest = async <T>(
  url: string,
  reqInit: RequestInit
): Promise<ResponseOrError<T>> => {
  try {
    const response = await fetch(url, reqInit);
    if (response.ok) {
      const respBody = await response.json();
      return Right(respBody as T);
    } else {
      return Left(
        new Error(`HTTP Status ${response.status} - ${response.statusText}`)
      );
    }
  } catch (err) {
    return Left(new Error("An unknown error occured"));
  }
};
