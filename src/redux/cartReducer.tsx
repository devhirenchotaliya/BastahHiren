import { GET_CART_ITEM_COUNT, GET_CART_LIST } from "../actions/dispatchTypes";

const initialState = {
  cartItemData: {},
  cartCount: 0,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CART_LIST: {
      return { ...state, cartItemData: action.payload };
    }
    case GET_CART_ITEM_COUNT: {
      return { ...state, cartCount: action.payload };
    }
    default:
      return state;
  }
}
