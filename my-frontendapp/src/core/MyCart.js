import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getTotalItemInCart } from "../cartHelpers";
const Cart = () => {
  const [items, setItems] = useState();
  const [run, setRun] = useState(false);
  useEffect(() => {
    setItems(getTotalItemInCart());
  }, [run]);

  const ShowItems = () => {
    return (
      <div>
        <h2> Your Cart has{`${items.length}`} items </h2>
      </div>
    );
  };

  const noItemMessege = () => {
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shoping </Link>
    </h2>;
  };

  return (
    <Layout
      title="Your Cart"
      discription="Manage your cart.Add remove checkout or continue shoping  "
      className="container-fluid "
    >
      <div className="row">
        <div className="col-6">
          {items ? ShowItems(items) : noItemMessege()}
        </div>

        <div className="col-6">
          <h2> later </h2>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
