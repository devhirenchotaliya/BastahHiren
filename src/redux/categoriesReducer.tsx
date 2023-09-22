import {
  GET_CATEGORIES_LIST,
  GET_ITEMS_LIST,
  GET_SUB_CATEGORIES_LIST,
  IS_CATEGORIES_LOADING,
  IS_SUB_CATEGORIES_LOADING,
} from "../actions/dispatchTypes";

const initialState = {
  categoriesList: [],
  subCategoriesList: [],
  isCategorieLoading: false,
  isSubCategorieLoading: false,
  itemsList: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CATEGORIES_LIST: {
      return { ...state, categoriesList: action.payload };
    }
    case GET_SUB_CATEGORIES_LIST: {
      return { ...state, subCategoriesList: action.payload };
    }
    case GET_ITEMS_LIST: {
      return { ...state, itemsList: action.payload };
    }
    case IS_CATEGORIES_LOADING: {
      return { ...state, isCategorieLoading: action.payload };
    }
    case IS_SUB_CATEGORIES_LOADING: {
      return { ...state, isSubCategorieLoading: action.payload };
    }
    default:
      return state;
  }
}
