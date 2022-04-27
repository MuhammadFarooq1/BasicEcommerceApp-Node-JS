import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { createCategory } from "../admin/apiAdmin";
import { Link } from "react-router-dom";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructuring user token from local storage

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // send request to api
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const newCategoruForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control mt-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
        <button className="btn btn-outline-primary mt-3 mb-5">
          Create Category
        </button>
      </div>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back To Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      tiltle="Create Category"
      discription={`G'Day ${user.name}  Ready to create new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoruForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
