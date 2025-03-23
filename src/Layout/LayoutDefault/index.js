import { Outlet, NavLink } from "react-router-dom";
import "./LayoutDefault.scss";
import { useSelector } from "react-redux";

function LayoutDefault() {
  const authentic = localStorage.getItem("token");

  const isLogin = useSelector((state) => state.loginReducers);

  console.log(isLogin);

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <NavLink to="/">Quiz</NavLink>
          </div>
          {authentic ? (
            <>
              <div className="layout-default__middle">
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/topic">Topic</NavLink>
                  </li>
                  <li>
                    <NavLink to="/answers">Answers</NavLink>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          {authentic ? (
            <>
              <div className="layout-default__account">
                <NavLink to="/logout">Đăng xuất</NavLink>
              </div>
            </>
          ) : (
            <>
              <div className="layout-default__account">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </div>
            </>
          )}
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          Coppyright 2023 by 28tech
        </footer>
      </div>
    </>
  );
}

export default LayoutDefault;
