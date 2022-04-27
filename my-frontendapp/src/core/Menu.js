import React, { Fragment } from "react";
import { logout, isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { countTotalAddItemInCart } from "../cartHelpers";
// const isActive = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: "#ff9900" };
//   } else {
//     return { color: "#ffffff" };
//   }
// };

export default function ({ history }) {
  let navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={"/shop"}>
            Shop
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={"/cart"}>
            My Cart{" "}
            <sup>
              <small className="badge bg-cart">
                {countTotalAddItemInCart()}
              </small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link className="nav-link" to={"/user/dashboard"}>
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link className="nav-link" to={"/admin/dashboard"}>
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to={"/Signin"}>
                SignIn
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/Signup"}>
                SignUp
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <div style={{ float: "right" }}>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  logout(() => {
                    navigate("/");
                  })
                }
              >
                Logout
              </span>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}
