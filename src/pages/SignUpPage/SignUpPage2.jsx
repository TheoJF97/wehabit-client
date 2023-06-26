import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/WeHabit-full-logo.png";

export default function SignUpPage2() {
  const navigate = useNavigate();
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;
  const signupUrl = `${serverUrl}/signup`;

  const [signUpError, setSignUpError] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    axios
      .post(signupUrl, {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log("Signup Successful:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        setSignUpError(error.response.data.message);
      });
  };

  return (
    <>
      <section className="signup">
        <img
          src={logo}
          alt="WeHabit Spur Growth logo"
          className="signup__logo"
        />
        <div className="signup__card">
          <h1 className="signup__title">Sign Up</h1>
          <Link to="/login" className="signup__redirect">
            <span className="signup__redirect-message">
              Already signed up? Login Here
            </span>
          </Link>

          <form onSubmit={handleSignup} className="signup__form">
            
            <div className="signup__name">
              <label htmlFor="name" className="signup__name-label">
                Full name:
              </label>
              <input type="text" name="name" className="signup__name-input" />
            </div>

            <div className="signup__email">
              <label htmlFor="email" className="signup__email-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="signup__email-input"
              />
              {signUpError && (
                <span className="signup__email-error">{signUpError}</span>
              )}
            </div>

            <div className="signup__password">
              <label htmlFor="password" className="signup__password-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="signup__password-input"
              />
            </div>

            <div className="signup__button-container">
              <button type="submit" className="signup__button">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
