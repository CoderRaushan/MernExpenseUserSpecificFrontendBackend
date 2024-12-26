import React, { useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ItemPost = () => {
  const navigate = useNavigate();
  const itemRef = useRef();
  const costRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = itemRef.current.value;
    const cost = costRef.current.value;
    const category = categoryRef.current.value;

    const formData = new FormData();
    formData.append("item", item);
    formData.append("cost", cost);
    formData.append("category", category);
    try { 
      const response = await axios.post(
        "http://localhost:8243/user/AddExpense"
        ,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Item added successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/ShowExpense");
    } catch (error) 
    {
      console.error("There was an error!", error);
      toast.error(error.response?.data?.message || "Item add failed.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="col col-6 offset-3 mb-3 mt-5">
          <label htmlFor="item" className="form-label">
            Item
          </label>
          <input type="text" className="form-control" id="Item" ref={itemRef} />
        </div>
        <div className="col col-6 offset-3 mb-3">
          <label htmlFor="cost" className="form-label">
            Cost
          </label>
          <input
            type="number"
            className="form-control"
            id="cost"
            ref={costRef}
          />
        </div>
        <div className="col col-6 offset-3 mb-3">
        <label htmlFor="item-category" className="form-label">Category</label>
            <select id="item-category" ref={categoryRef} name="category" className="form-control" required>
                <option value="" disabled defaultValue={""}>Select Category</option>
                <option value="Food">Food</option>
                <option value="Mess">Mess</option>
                <option value="Transfer">Transfer</option>
                <option value="Education">Education</option>
                <option value="Snacks">Snacks</option>
                <option value="Saturday market">Saturday market</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
            </select>
        </div>
        <div className="col col-6 offset-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ItemPost;
