import axios from "axios";
import { ADD_CART_ITEM, GET_FOOD } from "./actionType";

export const getCartItems = async (token, dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    dispatch({ type: ADD_CART_ITEM, payload: res.data.cartData });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      console.error(error.response.data.message);
    }
    console.error(error);
  }
};

export const fetchFoodList = async (dispatch) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/food/list`
  );
  dispatch({ type: GET_FOOD, payload: response.data.foods });
};
