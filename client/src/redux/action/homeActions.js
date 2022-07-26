import { api } from "../../helpers/api";

export const QUERY_REQUEST_PROCESS = "QUERY_REQUEST_PROCESS";
export const QUERY_REQUEST_ERROR = "QUERY_REQUEST_ERROR";
export const QUERY_REQUEST_SUCCESS = "QUERY_REQUEST_SUCCESS";

export const ADD_QUERY_REQUEST_SUCCESS = "ADD_QUERY_REQUEST_SUCCESS";
export const DEL_QUERY_REQUEST_SUCCESS = "DEL_QUERY_REQUEST_SUCCESS";

export const queryRequestProcess = () => ({
  type: QUERY_REQUEST_PROCESS,
});

export const queryRequestSuccess = (data) => ({
  type: QUERY_REQUEST_SUCCESS,
  data,
});

export const queryRequestError = (error) => ({
  type: QUERY_REQUEST_ERROR,
  error,
});

export const addQueryRequestSuccess = (data) => ({
  type: ADD_QUERY_REQUEST_SUCCESS,
  data,
});

export const delQueryRequestSuccess = (data) => ({
  type: DEL_QUERY_REQUEST_SUCCESS,
  data,
});

export const queryFetchRequest = () => async (dispatch) => {
  try {
    dispatch(queryRequestProcess());

    const data = await api("get", "queries");

    dispatch(queryRequestSuccess(data));
  } catch (error) {
    dispatch(queryRequestError(error.response ? error.response.data : error));
  }
};

export const addQueryFetchRequest = (id, query) => async (dispatch) => {
  try {
    dispatch(queryRequestProcess());

    const data = await api("post", "query/save", { _id: id, query: query });

    dispatch(addQueryRequestSuccess(data));
  } catch (error) {
    dispatch(queryRequestError(error.response ? error.response.data : error));
  }
};

export const delQueryFetchRequest = (id) => async (dispatch) => {
  try {
    dispatch(queryRequestProcess());

    const data = await api("post", "query/del", { _id: id });

    dispatch(delQueryRequestSuccess(data));
  } catch (error) {
    dispatch(queryRequestError(error.response ? error.response.data : error));
  }
};
