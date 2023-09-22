import { ThunkAction } from "redux-thunk";
import {
  IS_LOADING,
  GET_ORDER_LIST,
  GET_ORDER_ITEM_DETAILS,
} from "./dispatchTypes";
import { RootState } from "../helper/types";
import { AnyAction } from "redux";
import { getAsyncToken } from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, POST, api } from "../helper/apiConstants";
import { errorToast, successToast } from "../helper/globalFunctions";
import { navigationRef } from "../navigations/MainNavigator";

export const placeOrder =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
      "Content-Type": "multipart/form-data",
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.place_order,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            if (request.onSuccess)
              request.onSuccess(response?.data?.data?.order);
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

export const myOrders =
  (
    onSuccess?: (res: boolean) => void
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.my_orders,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_ORDER_LIST,
              payload: response?.data?.data || [],
            });
            if (onSuccess)
              onSuccess(response?.data?.data?.length > 0 ? true : false);
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
      });
  };

export const getOrderDetails =
  (
    params: any,
    onSuccess?: (response: any) => void
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.order_details,
      headers: headers,
      params: params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_ORDER_ITEM_DETAILS,
              payload: response?.data?.data || [],
            });
            if (onSuccess) onSuccess(response?.data?.data);
            // @ts-ignore
          } else {
            errorToast(response.data.message);
            navigationRef.current?.goBack();
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
        navigationRef.current?.goBack();
      });
  };

export const clearOrderDetails =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch({ type: GET_ORDER_ITEM_DETAILS, payload: {} });
  };

export const rateOrder =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
      "Content-Type": "multipart/form-data",
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.rate_order,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            if (request.onSuccess) request.onSuccess(response?.data);
            successToast(response?.data?.message);
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
