import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage2() {
  const navigate = useNavigate();
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;
  const signupUrl = `${serverUrl}/signup`;

  // State Variables
  const [signUpError, setSignUpError] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    // Grab form's values
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
      <section className="sign-up">
        <h1 className="sign-up__title">Sign Up</h1>

        <form onSubmit={handleSignup} className="sign-up__form">
          <div className="sign-up__name">
            Full name:
            <input type="text" name="name" className="sign-up__name-input" />
          </div>

          <div className="sign-up__email">
            email:
            <input type="email" name="email" className="sign-up__email-input" />
            {signUpError && (
              <span className="sign-up__email-error">{signUpError}</span>
            )}
          </div>

          <div className="sign-up__password">
            password:
            <input
              type="password"
              name="password"
              className="sign-up__password-input"
            />
          </div>

          <button type="submit" className="sign-up__button">
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
}
