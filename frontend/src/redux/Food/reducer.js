import { ADD_CART_ITEM, GET_FOOD } from "./actionType";

const intialState = {
  foodList: [],
  cart: {},
};

export const reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ADD_CART_ITEM:
      return { ...state, cart: payload };
    case GET_FOOD:
      return { ...state, foodList: payload };
    default:
      return state;
  }
};
