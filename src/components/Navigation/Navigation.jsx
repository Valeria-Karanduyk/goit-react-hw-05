import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <>
      <nav className={s.nav}>
        <NavLink className={s.NavLink} to="/">
          Home
        </NavLink>
        <NavLink className={s.NavLink} to="/movies">
          Movies
        </NavLink>
      </nav>

      <div className={s.box}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default Navigation;
