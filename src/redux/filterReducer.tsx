import { GET_FILTER_LIST, GET_SEARCH_DATA } from "../actions/dispatchTypes";

const initialState = {
  filterData: {},
  searchData: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_FILTER_LIST: {
      return { ...state, filterData: action.payload };
    }
    case GET_SEARCH_DATA: {
      return { ...state, searchData: action.payload };
    }
    default:
      return state;
  }
}
