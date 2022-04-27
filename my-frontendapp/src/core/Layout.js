import React from "react";
import Menu from "./Menu";
import "../style.css";

const Layout = ({
  title = "Title",
  discription = "Discription",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className=" jumbotron ">
      <h2 style={{ paddingLeft: "20px" }} className="pt-5">
        {title}{" "}
      </h2>
      <p className="lead pt-2" style={{ paddingLeft: "40px" }}>
        {discription}
      </p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
