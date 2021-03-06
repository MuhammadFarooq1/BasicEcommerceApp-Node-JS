import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      discription="Node React App "
      className="container-fluid "
    >
      <Search></Search>
      <h2 className="mb-4 m-lg-3">Best Sellers</h2>
      <div className="row">
        {productBySell.map((product, index) => (
          <div key={index} className="col-4 mb-3  ">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4 m-lg-3 ">New Arrivals</h2>
      <div className="row">
        {productByArrival.map((product, index) => (
          <div key={index} className="col-4 mb-3  ">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
