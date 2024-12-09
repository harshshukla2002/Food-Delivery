import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./styles.css";
import axios from "axios";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/food/list`
      );
      setList(res.data.foods);
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      }
      console.error(error);
    }
  };

  const removeFood = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/food/remove/${id}`
      );
      toast.success(res.data.message);
      fetchList();
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list?.map((food, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img
                src={`${process.env.REACT_APP_API_URL}/images/${food.image}`}
                alt=""
              />
              <p>{food.name}</p>
              <p>{food.category}</p>
              <p>${food.price}</p>
              <p className="cursor" onClick={() => removeFood(food._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
