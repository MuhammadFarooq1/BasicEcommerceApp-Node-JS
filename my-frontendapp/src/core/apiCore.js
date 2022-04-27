// get product by sold
import querystring from "query-string";
export const getProducts = (sortBy) => {
  return fetch(
    `http://localhost:8000/products?sortBy=${sortBy}&order=desc&limit=6`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getCategories = () => {
  return fetch(`http://localhost:8000/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  // console.log(name, email, password);
  const data = {
    skip,
    limit,
    filters,
  };
  return fetch(`http://localhost:8000/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const searchProductsLists = (params) => {
  const query = querystring.stringify(params);
  console.log("query", query);
  return fetch(`http://localhost:8000/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const readProductDetail = (productId) => {
  return fetch(`http://localhost:8000/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};


export const listOfRelatedProduct = (productId) => {
  return fetch(`http://localhost:8000/products/relatedProducts/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
