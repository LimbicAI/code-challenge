import {
  QUERY_REQUEST_PROCESS,
  QUERY_REQUEST_ERROR,
  QUERY_REQUEST_SUCCESS,
  ADD_QUERY_REQUEST_SUCCESS,
  DEL_QUERY_REQUEST_SUCCESS,
} from "../action/homeActions";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUERY_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case QUERY_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message,
      };
    case QUERY_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case ADD_QUERY_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case DEL_QUERY_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    default:
      return state;
  }
};
