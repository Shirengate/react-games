import { type FC } from "react";

import "./index.scss";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router";

const index: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default index;
