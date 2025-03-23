import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../actions/login";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();
  localStorage.clear();
  const dispatch = useDispatch();

  useEffect(() => {
    navigate("/login");
    dispatch(checkLogin(false));
  }, []);

  return <></>;
}

export default Logout;
