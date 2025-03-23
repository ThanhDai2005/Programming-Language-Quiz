import { useEffect, useState } from "react";
import { createRegister, getLogin } from "../../services/usersService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [account, setAccount] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const respone = await getLogin();
      setData(respone);
    };
    fetchAPI();
  }, []);

  const generateToken = () => {
    return btoa(Math.random().toString()).substring(0, 20); // Lấy 16 ký tự đầu
  };

  const handleChange = (e) => {
    const object = {
      ...account,
      [e.target.name]: e.target.value,
      token: generateToken(),
    };
    setAccount(object);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkEmail = [...data].find((item) => item.email === account.email);

    if (checkEmail) {
      alert("Email đã tồn tại");
    } else {
      const respone = await createRegister(account);
      navigate("/login");
      console.log(respone);
    }
  };

  return (
    <>
      <div className="form-loginregister">
        <form onSubmit={handleSubmit}>
          <h2>Register Account</h2>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
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
          <button>Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
