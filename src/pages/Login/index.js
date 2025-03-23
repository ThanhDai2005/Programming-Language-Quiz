import { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { getLogin } from "../../services/usersService";

function Login() {
  const [data, setData] = useState([]);
  const [account, setAccount] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async () => {
      const respone = await getLogin();
      setData(respone);
    };
    fetchAPI();
  }, []);

  const handleChange = (e) => {
    const object = {
      ...account,
      [e.target.name]: e.target.value,
    };
    setAccount(object);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = [...data].find(
      (item) =>
        item.email === account.email && item.password === account.password
    );

    if (user) {
      localStorage.setItem("id", user.id);
      localStorage.setItem("fullName", user.fullName);
      localStorage.setItem("email;", user.email);
      localStorage.setItem("token", user.token);
      navigate("/");
      dispatch(checkLogin(true));
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  return (
    <>
      <div className="form-loginregister">
        <form onSubmit={handleSubmit}>
          <h2>Login Quiz</h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
