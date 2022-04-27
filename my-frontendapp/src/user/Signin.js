import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import { useState } from "react";
import { apiSignin, authenticateToken, isAuthenticated } from "../auth/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "Farooqkhan@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    apiSignin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticateToken(data, () => {
          setValues({
            ...values,
            // email: "",
            // password: "",
            // error: "",
            // loading: false,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const SignUpForm = () => (
    <form>
      <div className="form-group mt-3">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        ></input>
      </div>

      <div className="form-group mt-3">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="Password"
          className="form-control"
          value={password}
        ></input>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  return (
    <Layout
      title="SignIn Page"
      discription="Sign In With email and Password "
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {SignUpForm()}
      {redirectUser()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signin;
