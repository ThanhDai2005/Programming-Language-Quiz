import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const isLogin = localStorage.getItem("id");

  return <>{isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoutes;
