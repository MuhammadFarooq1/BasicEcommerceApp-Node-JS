import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoutes";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AdminPrivateRoute from "./auth/AdminRoutes";
import AddCategory from "./admin/AddCategory";
import AddProducts from "./admin/AddProducts";
import Shop from "./core/Shop";
import ShowProduct from "./core/ShowSingleProduct";
import Cart from "./core/MyCart";
// import Menu from "./core/Menu";
const MyRoutes = () => {
  return (
    <Router>
      {/* <Menu /> */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" exact element={<Shop />} />
        <Route path="/Signin" exact element={<Signin />} />
        <Route path="/Signup" exact element={<Signup />} />
        <Route
          path="/user/dashboard"
          exact
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route
          path="/admin/dashboard"
          exact
          element={<AdminPrivateRoute component={AdminDashboard} />}
        />
        <Route
          path="/create/category"
          exact
          element={<AdminPrivateRoute component={AddCategory} />}
        />
        <Route
          path="/create/product"
          exact
          element={<AdminPrivateRoute component={AddProducts} />}
        />

        <Route path="/product/:productId" exact element={<ShowProduct />} />
        <Route path="/cart" exact element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
