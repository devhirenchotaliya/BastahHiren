import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../helper/types";
import {
  GET_CITIES_LIST,
  GET_SETTINGS_DATA,
  IS_LOADING,
  USER_INFO,
} from "./dispatchTypes";
import { getAsyncToken } from "../helper/asyncStorage";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, api } from "../helper/apiConstants";
import { errorToast } from "../helper/globalFunctions";

export const setUserInfo =
  (data: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch({
      type: USER_INFO,
      payload: data,
    });
  };

export const getSettings =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    // dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.get_settings,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          // dispatch({ type: IS_LOADING, payload: false });
          if (response.data.status) {
            dispatch({
              type: GET_SETTINGS_DATA,
              payload: response?.data?.data?.settings,
            });
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
      });
  };

export const getCities =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    let headers = {
      Authorization: await getAsyncToken(),
    };
    // dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.get_cities,
      headers: headers,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          // dispatch({ type: IS_LOADING, payload: false });
          let cities: any = [];
          response?.data?.data?.cities?.map((item: any, index: number) => {
            cities.push({ id: index, value: item });
          });
          if (response.data.status) {
            dispatch({
              type: GET_CITIES_LIST,
              payload: cities || [],
            });
          } else {
            errorToast(response.data.message);
          }
        }
      })
      .catch((error) => {
        dispatch({ type: IS_LOADING, payload: false });
      });
  };
