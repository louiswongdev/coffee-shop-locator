// initialize unsplash api
import { createApi } from "unsplash-js";

// on your node server
const unsplashAPI = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashAPI.search.getPhotos({
    query: "coffe shop",
    perPage: 30,
  });

  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  console.log("from 4sq", process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", limit),
    options
  );

  const data = await response.json();

  const coffeeStoreResults =
    data?.results?.map((venue, i) => {
      const neighbourhood = venue.location.neighborhood;
      return {
        id: venue.fsq_id,
        address: venue.location.address || "",
        name: venue.name,
        neighbourhood:
          (neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) ||
          venue.location.cross_street ||
          "",
        imgUrl: photos[i],
      };
    }) || [];

  return coffeeStoreResults;
};
