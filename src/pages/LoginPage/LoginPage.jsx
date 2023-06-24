import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setCurrentUserId }) {
  // Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;
  const loginUrl = `${serverUrl}/login`;

  // Declare state variables
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Grab the form's values
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Here send a POST request to loginUrl with username and password data
    axios
      .post(loginUrl, {
        email,
        password,
      })

      .then((response) => {
        const token = response.data.token;
        sessionStorage.authToken = token;

        // Fetch user ID after successful login
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
      <h1 className="login__title">Login</h1>
      {isLoginError && <label className="error">{errorMessage}</label>}
      <form onSubmit={handleLogin} className="login__form">
        <div className="login__email">
          email:
          <input type="email" name="email" className="login__email-input" />
        </div>

        <div className="login__password">
          password:
          <input
            type="password"
            name="password"
            className="login__password-input"
          />
        </div>

        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    </section>
  );
}
