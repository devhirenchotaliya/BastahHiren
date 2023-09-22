import { ThunkAction } from "redux-thunk";
import {
  GET_DASHBOARD_DATA,
  IS_FAVOURITE_LOADING,
  IS_LOADING,
  ITEM_DEATILS,
} from "./dispatchTypes";
import { RootState } from "../helper/types";
import { AnyAction } from "redux";
import { getAsyncToken } from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, api } from "../helper/apiConstants";
import { errorToast } from "../helper/globalFunctions";
import { navigationRef } from "../navigations/MainNavigator";
import { screenName } from "../helper/constants";

export const getDashboard =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.dashboard,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_DASHBOARD_DATA,
              payload: response?.data?.data,
            });
            // if (request.onSuccess) request.onSuccess(response.data);
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

export const getItemDetails =
  (
    params: any,
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
      url: api.item_details,
      headers: headers,
      params: params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          dispatch({ type: IS_FAVOURITE_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: ITEM_DEATILS,
              payload: response?.data?.data,
            });
            // @ts-ignore
            navigationRef.current?.navigate(screenName.item_details);
            // if (request.onSuccess) request.onSuccess(response.data);
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
        dispatch({ type: IS_FAVOURITE_LOADING, payload: false });
        // if (request.onFailure) request.onFailure(error.response);
      });
  };
