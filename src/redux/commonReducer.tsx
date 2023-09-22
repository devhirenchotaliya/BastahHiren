import {
  GET_CITIES_LIST,
  GET_NOTIFICATIONS,
  GET_SETTINGS_DATA,
  IS_FAVOURITE_LOADING,
  IS_LOADING,
  IS_SEARCH_LOADING,
  USER_INFO,
} from "../actions/dispatchTypes";

const initialState = {
  userInfo: {},
  isLoading: false,
  isFavouriteLoading: false,
  settingData: {},
  isSearchLoading: false,
  notificationList: [],
  citiesList: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case IS_FAVOURITE_LOADING: {
      return { ...state, isFavouriteLoading: action.payload };
    }
    case IS_SEARCH_LOADING: {
      return { ...state, isSearchLoading: action.payload };
    }
    case USER_INFO: {
      return { ...state, userInfo: action.payload };
    }
    case GET_SETTINGS_DATA: {
      return { ...state, settingData: action.payload };
    }
    case GET_CITIES_LIST: {
      return { ...state, citiesList: action.payload };
    }
    case GET_NOTIFICATIONS: {
      return { ...state, notificationList: action.payload };
    }
    default:
      return state;
  }
}
