import { GET_CARD_LIST } from "../actions/dispatchTypes";

const initialState = {
  myCardList: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CARD_LIST: {
      return { ...state, myCardList: action.payload };
    }
    default:
      return state;
  }
}
