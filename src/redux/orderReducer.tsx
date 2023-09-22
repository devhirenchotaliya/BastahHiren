import {
  GET_ORDER_ITEM_DETAILS,
  GET_ORDER_LIST,
} from "../actions/dispatchTypes";

const initialState = {
  myOrderList: [],
  orderItemDetails: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_ORDER_LIST: {
      return { ...state, myOrderList: action.payload };
    }
    case GET_ORDER_ITEM_DETAILS: {
      return { ...state, orderItemDetails: action.payload };
    }
    default:
      return state;
  }
}
