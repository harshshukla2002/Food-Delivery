import { ADD_TOKEN } from "./actiontype";

const intialState = {
  token: localStorage.getItem("token") || "",
};

export const reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ADD_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
