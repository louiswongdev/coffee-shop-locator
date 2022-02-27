import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);

    console.log("response", response);

    res.status(200);
    res.json(response);
  } catch (error) {
    console.log("There is an error", error);
    res.status(500);
    res.json({ message: "there was an error in the server", error });
  }
};

export default getCoffeeStoresByLocation;
