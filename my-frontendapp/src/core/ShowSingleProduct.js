import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { readProductDetail, listOfRelatedProduct } from "./apiCore";
import { useParams } from "react-router-dom";
import Card from "./Card";

const ShowProduct = (props) => {
  const pid = useParams();

  // const pid = props.productId;
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    console.log(productId);
    readProductDetail(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch api related products
        listOfRelatedProduct(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = pid.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product && product.name}
      discription={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid "
    >
      <h2 className="mb-4">Product Detail</h2>

      <div className="row">
        <div className="col-6">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        <div className="col-6">
          <h4>Related Products </h4>
          {relatedProduct.map((p, i) => (
            <div key={i} className="mb-3">
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ShowProduct;
