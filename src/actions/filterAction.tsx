import { ThunkAction } from "redux-thunk";
import {
  GET_FILTER_LIST,
  GET_ITEMS_LIST,
  GET_SEARCH_DATA,
  IS_LOADING,
  IS_SEARCH_LOADING,
} from "./dispatchTypes";
import { RootState } from "../helper/types";
import { AnyAction } from "redux";
import { getAsyncToken } from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, POST, api } from "../helper/apiConstants";
import { errorToast } from "../helper/globalFunctions";

export const getFilterData =
  (
    onSuccess?: (res: any) => void
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.get_filter_data,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_FILTER_LIST,
              payload: response?.data?.data,
            });
            if (onSuccess) onSuccess(response.data?.data);
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

export const setFilterData =
  (data: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: GET_FILTER_LIST, payload: data });
  };

export const filterItems =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      "Content-Type": "multipart/form-data",
      Authorization: await getAsyncToken(),
    };
    if (!request.is_loading_stop) {
      dispatch({ type: IS_LOADING, payload: true });
    }
    return makeAPIRequest({
      method: POST,
      url: api.filter,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_ITEMS_LIST,
              payload: response?.data?.data?.items || [],
            });
            if (request.onSuccess) request.onSuccess(response.data?.data);
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const globalSearch =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_SEARCH_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.search,
      headers: headers,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_SEARCH_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_SEARCH_DATA,
              payload: response?.data?.data,
            });
            if (request.onSuccess) request.onSuccess(response.data?.data);
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_SEARCH_LOADING, payload: false });
        if (request.onFailure) request.onFailure(error.response);
      });
  };

export const addRecentSearch =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      "Content-Type": "multipart/form-data",
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_SEARCH_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.add_recent_search,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_SEARCH_LOADING, payload: false });
          if (response.data.status) {
            // if (request.onSuccess) request.onSuccess(response.data);
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_SEARCH_LOADING, payload: false });
        // if (request.onFailure) request.onFailure(error.response);
      });
  };

export const clearRecentSearch =
  (
    onSuccess: (res: any) => void
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      "Content-Type": "multipart/form-data",
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_SEARCH_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.clear_recent_search,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_SEARCH_LOADING, payload: false });
          if (response.data.status) {
            if (onSuccess) onSuccess(response.data);
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_SEARCH_LOADING, payload: false });
      });
  };
