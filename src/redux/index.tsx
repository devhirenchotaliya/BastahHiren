import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import { USER_LOGOUT } from "../actions/dispatchTypes";
import homeReducer from "./homeReducer";
import favouriteReducer from "./favouriteReducer";
import categoriesReducer from "./categoriesReducer";
import cartReducer from "./cartReducer";
import addressReducer from "./addressReducer";
import orderReducer from "./orderReducer";
import sellerReducer from "./sellerReducer";
import filterReducer from "./filterReducer";
import paymentReducer from "./paymentReducer";

const middleware = [thunk];

const reducers = combineReducers({
  auth: authReducer,
  common: commonReducer,
  home: homeReducer,
  favourite: favouriteReducer,
  categories: categoriesReducer,
  shopping: cartReducer,
  address: addressReducer,
  order: orderReducer,
  seller: sellerReducer,
  filter: filterReducer,
  payment: paymentReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const store = configureStore({ reducer: rootReducer, middleware });

export default store;
