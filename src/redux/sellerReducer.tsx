import {
  GET_DASHBOARD_DATA,
  GET_SELLER_LIST,
  GET_SELLER_PROFILE,
  ITEM_DEATILS,
} from "../actions/dispatchTypes";

const initialState = {
  sellerDetails: {},
  sellerList: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_SELLER_PROFILE: {
      return { ...state, sellerDetails: action.payload };
    }
    case GET_SELLER_LIST: {
      return { ...state, sellerList: action.payload };
    }
    default:
      return state;
  }
}
