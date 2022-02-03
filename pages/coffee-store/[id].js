import { useRouter } from "next/router";
import React from "react";

const CoffeeStore = () => {
  const {
    query: { id },
  } = useRouter();
  console.log(id);
  return <div>Coffee Store Page</div>;
};

export default CoffeeStore;
