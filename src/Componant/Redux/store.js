import { configureStore } from "@reduxjs/toolkit";
import getPizzas_Slice from "./getPizzasSlice";
import getOrderUser_Slice from "./getOrderSlice";
import getUserCart_Slice from "./getCartSlice";
import getMeals_Slice from "./getMealsSlice";
import getUserProfile_Slice from "./getUserProfileSlice";

const store = configureStore({
  reducer: {
    getPizzas: getPizzas_Slice,
    getMeals: getMeals_Slice,
    userOrders: getOrderUser_Slice,
    userCart: getUserCart_Slice,
    userProfiles: getUserProfile_Slice,
  },
});

export default store;
