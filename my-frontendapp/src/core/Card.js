import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { AddItemCart } from "../cartHelpers";
const Card = ({ product, showViewProductButton = true }) => {
  const Navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const AddToCart = () => {
    AddItemCart(product, () => {
      setRedirect(true);
    });
  };

  const redirectUser = (redirect) => {
    if (redirect) {
      Navigate("/cart");
    }
  };

  const showCartButton = () => {
    return (
      <button
        onClick={AddToCart}
        className="btn btn-outline-warning mt-2 mb-2 m-lg-2 "
      >
        Add Cart
      </button>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge bg-primary badge-pill"> In Stock </span>
    ) : (
      <span className="badge bg-primary badge-pill">Out of stock </span>
    );
  };

  return (
    <div className="card ">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {redirectUser(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)} </p>
        <p className="black-10">${product.price}</p>
        {/* <p className="black-9">
          Category {product.category && product.category.name}
        </p> */}

        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        <p>Quantity {product.quantity} </p>
        {showStock(product.quantity)}
        <br></br>
        {showViewButton(showViewProductButton)}
        {showCartButton()}
      </div>
    </div>
  );
};

export default Card;
