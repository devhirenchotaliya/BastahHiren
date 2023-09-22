import { ThunkAction } from "redux-thunk";
import {
  GET_NOTIFICATIONS,
  IS_LOADING,
  USER_INFO,
  USER_LOGOUT,
} from "./dispatchTypes";
import { RootState } from "../helper/types";
import { AnyAction } from "redux";
import {
  clearAsync,
  getAsyncToken,
  setAsyncGuest,
  setAsyncUserInfo,
} from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, POST, api } from "../helper/apiConstants";
import { errorToast, successToast } from "../helper/globalFunctions";

export const getProfile =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.get_profile,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            setAsyncGuest(false);
            setAsyncUserInfo(response?.data?.data?.user);
            dispatch({
              type: USER_INFO,
              payload: { ...response?.data?.data?.user, isGuest: false },
            });
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

export const updateProfile =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
      "Content-Type": "multipart/form-data",
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.update_profile,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            setAsyncGuest(false);
            setAsyncUserInfo(response?.data?.data);
            dispatch({
              type: USER_INFO,
              payload: { ...response?.data?.data, isGuest: false },
            });
            if (request.onSuccess) request.onSuccess(response?.data);
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

export const deleteAccount =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
      "Content-Type": "multipart/form-data",
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.delete_account,
      headers: headers,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            clearAsync();
            setAsyncGuest(true);
            dispatch({ type: USER_LOGOUT });
            successToast(response?.data?.message);
            if (request.onSuccess) request.onSuccess(response.data);
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

export const getNotifications =
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
      url: api.get_notifications,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_NOTIFICATIONS,
              payload: response?.data?.data?.notifications || [],
            });
            if (onSuccess)
              onSuccess(
                response?.data?.data?.notifications?.length > 0 ? true : false
              );
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
      });
  };

export const clearAllNotifications =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
      "Content-Type": "multipart/form-data",
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.clear_all_notifications,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (response.data.status) {
            if (request.onSuccess) request.onSuccess(response.data);
          } else {
            errorToast(response.data.message);
            dispatch({ type: IS_LOADING, payload: false });
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
        if (request.onFailure) request.onFailure(error.response);
      });
  };
