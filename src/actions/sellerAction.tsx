import { ThunkAction } from "redux-thunk";
import {
  IS_LOADING,
  GET_SELLER_LIST,
  GET_SELLER_PROFILE,
} from "./dispatchTypes";
import { RootState } from "../helper/types";
import { AnyAction } from "redux";
import { getAsyncToken } from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, api } from "../helper/apiConstants";
import { errorToast } from "../helper/globalFunctions";
import { navigationRef } from "../navigations/MainNavigator";

export const getSellerProfile =
  (
    params: any,
    is_stop_loading?: boolean
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    if (!is_stop_loading) dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.get_seller_profile,
      headers: headers,
      params: params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_SELLER_PROFILE,
              payload: response?.data?.data?.seller,
            });
            // if (request.onSuccess) request.onSuccess(response.data);
          } else {
            errorToast(response.data.message);
            navigationRef.current?.goBack();
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
        navigationRef.current?.goBack();

        // if (request.onFailure) request.onFailure(error.response);
      });
  };

export const clearSellerProfile =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch({ type: GET_SELLER_PROFILE, payload: {} });
  };

export const getSellersList =
  (
    onSuccess: (res: boolean) => void,
    is_stop_loading?: boolean,
    params?: any
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    if (!is_stop_loading) {
      dispatch({ type: IS_LOADING, payload: true });
    }
    return makeAPIRequest({
      method: GET,
      url: api.get_sellers_list,
      headers: headers,
      params: params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_SELLER_LIST,
              payload: response?.data?.data?.sellers,
            });
            if (onSuccess)
              onSuccess(
                response?.data?.data?.sellers?.length > 0 ? true : false
              );
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
