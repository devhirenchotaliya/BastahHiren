import {
  GET_FAVOURITE_ITEMS,
  GET_NOTIFICATIONS,
} from "../actions/dispatchTypes";

const initialState = {
  favouriteList: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_FAVOURITE_ITEMS: {
      return { ...state, favouriteList: action.payload };
    }
    default:
      return state;
  }
}
