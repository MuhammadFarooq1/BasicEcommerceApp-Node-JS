import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Routes
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <myComponent {...props} />
//       ) : (
//         // <Navigate to="/Signin" replace={true} />

//         <Navigate to="/Signin" replace />
//       )
//     }
//   />
// );

// export default PrivateRoute;

export default function AdminPrivateRoute({ component: Component, ...rest }) {
  // const isLogged = false;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticated() && isAuthenticated().user.role === 1 ? <Component /> : <Navigate to="/Signin" />;
}
