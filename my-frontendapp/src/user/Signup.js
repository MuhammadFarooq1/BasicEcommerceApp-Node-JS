import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { API } from "../config";
import { useState } from "react";
import { apiSignup } from "../auth/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    apiSignup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const SignUpForm = () => (
    <form>
      <div className="form-group mt-3">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        ></input>
      </div>

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
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      New Account. is created please <Link to={"/signin"}>Signin </Link>
    </div>
  );

  return (
    <Layout
      title="SignUP Page"
      discription="Sign Up With email and Password "
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showSuccess()}
      {SignUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
