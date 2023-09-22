import { ThunkAction } from "redux-thunk";
import {
  IS_CATEGORIES_LOADING,
  GET_CATEGORIES_LIST,
  GET_SUB_CATEGORIES_LIST,
  IS_SUB_CATEGORIES_LOADING,
  IS_LOADING,
  GET_ITEMS_LIST,
} from "./dispatchTypes";
import { RootState } from "../helper/types";
import { AnyAction } from "redux";
import { getAsyncToken } from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, api } from "../helper/apiConstants";
import { errorToast } from "../helper/globalFunctions";
import { navigationRef } from "../navigations/MainNavigator";
import { screenName } from "../helper/constants";

export const getCategories =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    if (request.is_loading_start) {
      dispatch({ type: IS_CATEGORIES_LOADING, payload: true });
      dispatch({ type: IS_SUB_CATEGORIES_LOADING, payload: true });
    }
    return makeAPIRequest({
      method: GET,
      url: api.categories,
      headers: headers,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (response.data.status) {
            dispatch({
              type: GET_CATEGORIES_LIST,
              payload: response?.data?.data?.categories || [],
            });
            if (request.onSuccess)
              request.onSuccess(response?.data?.data?.categories || []);
          } else {
            dispatch({ type: IS_CATEGORIES_LOADING, payload: false });
            dispatch({ type: IS_SUB_CATEGORIES_LOADING, payload: false });
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_CATEGORIES_LOADING, payload: false });
        dispatch({ type: IS_SUB_CATEGORIES_LOADING, payload: false });
        // if (request.onFailure) request.onFailure(error.response);
      });
  };

export const getSubCategories =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    if (request.is_loading_start) {
      dispatch({ type: IS_SUB_CATEGORIES_LOADING, payload: true });
    }
    return makeAPIRequest({
      method: GET,
      url: api.sub_categories,
      headers: headers,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_CATEGORIES_LOADING, payload: false });
          dispatch({ type: IS_SUB_CATEGORIES_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_SUB_CATEGORIES_LIST,
              payload: response?.data?.data?.sub_categories || [],
            });
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_CATEGORIES_LOADING, payload: false });
        dispatch({ type: IS_SUB_CATEGORIES_LOADING, payload: false });

        // if (request.onFailure) request.onFailure(error.response);
      });
  };

export const getItems =
  (
    request: any,
    is_loading_stop?: boolean
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    if (!is_loading_stop) {
      dispatch({ type: IS_LOADING, payload: true });
    }
    return makeAPIRequest({
      method: GET,
      url: api.get_items,
      headers: headers,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_ITEMS_LIST,
              payload: response?.data?.data?.items || [],
            });
            if (request.onSuccess) request.onSuccess(response?.data?.data);
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
        // if (request.onFailure) request.onFailure(error.response);
      });
  };
