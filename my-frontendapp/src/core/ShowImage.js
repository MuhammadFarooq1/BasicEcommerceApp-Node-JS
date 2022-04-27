import React from "react";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`http://localhost:8000/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "200px", maxWidth: "100%" }}
    ></img>
  </div>
);

export default ShowImage;
