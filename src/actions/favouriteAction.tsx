import { ThunkAction } from "redux-thunk";
import {
  IS_LOADING,
  GET_FAVOURITE_ITEMS,
  IS_FAVOURITE_LOADING,
} from "./dispatchTypes";
import { RootState } from "../helper/types";
import { AnyAction } from "redux";
import { getAsyncToken } from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, POST, api } from "../helper/apiConstants";
import { errorToast } from "../helper/globalFunctions";

export const getFavouriteItems =
  (
    is_loading_stop?: boolean,
    onSuccess?: (response: any) => void
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
      url: api.my_favourite_items,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          dispatch({ type: IS_FAVOURITE_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_FAVOURITE_ITEMS,
              payload: response?.data?.data?.favourites,
            });
            if (onSuccess) onSuccess(response.data);
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

export const addRemoveFavourite =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
      "Content-Type": "multipart/form-data",
    };
    dispatch({ type: IS_FAVOURITE_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.add_remove_favourite,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (response.data.status) {
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            errorToast(response.data.message);
            dispatch({ type: IS_FAVOURITE_LOADING, payload: false });
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_FAVOURITE_LOADING, payload: false });
        if (request.onFailure) request.onFailure(error.response);
      });
  };
