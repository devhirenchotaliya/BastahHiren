import { GET_DASHBOARD_DATA, ITEM_DEATILS } from "../actions/dispatchTypes";

const initialState = {
  dashBoardData: {
    banners: [],
    groups: [],
    main_categories: [],
    recent_views: [],
  },
  itemDetails: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_DASHBOARD_DATA: {
      return { ...state, dashBoardData: action.payload };
    }
    case ITEM_DEATILS: {
      return { ...state, itemDetails: action.payload };
    }
    default:
      return state;
  }
}
