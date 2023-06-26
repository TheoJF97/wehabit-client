import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/WeHabit-full-logo.png";

export default function LoginPage({ setCurrentUserId }) {
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;
  const loginUrl = `${serverUrl}/login`;

  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    axios
      .post(loginUrl, {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        sessionStorage.authToken = token;

        axios
          .get(`${serverUrl}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const userId = response.data.userId;
            setCurrentUserId(userId);
            navigate(`/${userId}`);
          });
      })
      .catch(() => {
        setIsLoginError(true);
        setErrorMessage("wrong credentials");
      });
  };

  return (
    <section className="login">
      <img src={logo} alt="WeHabit Spur Growth logo" className="login__logo" />

      <div className="login__card">
        <h1 className="login__title">Login</h1>
        <Link to="/" className="login__redirect">
          <span className="login__redirect-message">
            Not signed up yet? Sign up Here
          </span>
        </Link>

        <form onSubmit={handleLogin} className="login__form">
          
          <div className="login__email">
            <label htmlFor="email" className="login__email-label">
              Email:
            </label>
            <input type="email" name="email" className="login__email-input" />
          </div>

          <div className="login__password">
            <label htmlFor="password" className="login__password-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="login__password-input"
            />
          </div>          
          {isLoginError && <label className="login__error">{errorMessage}</label>}
          
          <div className="login__button-container">
            <button type="submit" className="login__button">
              Login
            </button>
          </div>
          
        </form>
      </div>
    </section>
  );
}
