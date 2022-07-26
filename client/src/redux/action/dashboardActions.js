import { api } from "../../helpers/api";

export const QUERY_REQUEST_PROCESS = "QUERY_REQUEST_PROCESS";
export const QUERY_REQUEST_ERROR = "QUERY_REQUEST_ERROR";
export const QUERY_REQUEST_SUCCESS = "QUERY_REQUEST_SUCCESS";

export const ADD_ANSWER_REQUEST_SUCCESS = "ADD_ANSWER_REQUEST_SUCCESS";

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

export const addAnswerRequestSuccess = (data) => ({
  type: ADD_ANSWER_REQUEST_SUCCESS,
  data,
});

export const queryFetchRequest = (user_id) => async (dispatch) => {
  try {
    dispatch(queryRequestProcess());

    const data = await api("post", "answers", {
      user_id: user_id,
    });

    dispatch(queryRequestSuccess(data));
  } catch (error) {
    dispatch(queryRequestError(error.response ? error.response.data : error));
  }
};

export const addAnswerFetchRequest = (user_id, query_id, answer) => async (
  dispatch
) => {
  try {
    dispatch(queryRequestProcess());

    const data = await api("post", "answer/save", {
      user_id: user_id,
      query_id: query_id,
      answer: answer,
    });

    dispatch(addAnswerRequestSuccess(data));
  } catch (error) {
    dispatch(queryRequestError(error.response ? error.response.data : error));
  }
};
