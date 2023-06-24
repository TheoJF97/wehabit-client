import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  // Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;
  const loginUrl = `${serverUrl}/login`;

  // Declare state variables
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        sessionStorage.authToken = response.data.token;
        // setIsLoggedIn(true);
        navigate("/:id");
      })
      .catch(() => {
        setIsLoginError(true);
        setErrorMessage("wrong credentials");
      });
  };

  // Handle the Signup/Login
  // if (!isLoggedIn) return renderLogin();

  return (
    <>
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
    </>
  );
}
