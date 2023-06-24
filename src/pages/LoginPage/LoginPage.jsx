import axios from "axios";
import { useState } from "react";
import ProfilePage from "../ProfilePage/ProfilePage";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  // Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;
  const signupUrl = `${serverUrl}/signup`;
  const loginUrl = `${serverUrl}/login`;

  // Declare state variables
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Grab the form's values
    const username = e.target.username.value;
    const name = e.target.name.value;
    const password = e.target.password.value;

    // Here send a POST request to signupUrl with username, name and password data
    axios
      .post(signupUrl, {
        username,
        name,
        password,
      })
      .then(() => {
        setIsSignedUp(true);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Grab the form's values
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Here send a POST request to loginUrl with username and password data
    axios
      .post(loginUrl, {
        username,
        password,
      })
      .then((response) => {
        sessionStorage.authToken = response.data.token;
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setIsLoginError(true);
        setErrorMessage("wrong credentials");
      });
  };

  const renderLogin = () => (
    <div>
      <h1>Login</h1>
      {isLoginError && <label className="error">{errorMessage}</label>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );

  // Handle the Signup/Login
  if (!isLoggedIn) return renderLogin();

  return <ProfilePage />;
}
