export const createCategory = (userID, token, category) => {
  // console.log(name, email, password);
  return fetch(`http://localhost:8000/category/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createProduct = (userID, token, product) => {
  // console.log(name, email, password);
  return fetch(`http://localhost:8000/product/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
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
