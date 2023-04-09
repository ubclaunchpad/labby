
import "./index.css";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { POST_USER } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoIcon.png";

function SignUpForm() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPasswordChange = (e) => {
    if (password !== "") setVerifyPassword(e.target.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    let errors = false;
    
    if (firstName === "") {
      setFirstNameError("First Name Required");
      errors = true;
    } else {
      setFirstNameError("");
    }

    if (lastName === "") {
      setLastNameError("Last Name Required");
      errors = true;
    } else {
      setLastNameError("");
    }

    if (email === "") {
      setEmailError("Please enter an email address");
      errors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      errors = true;
    } else {
      setEmailError("");
    }
    
    if (password === "") {
      setPasswordError("Please enter a valid password");
      errors = true;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      errors = true;
    } else if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one number");
      errors = true;
    } else {
      setPasswordError("");
    }
    
    if (password !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match");
      errors = true;
    } else {
      setVerifyPasswordError("");
    }

    if (!errors) {
      const response = dispatch({
        type: POST_USER,
        payload: {
          user_id: uuid(),
          fk_organization_id: null,
          username: null,
          email: email,
          password: password,
        },
      });
      if (response.payload.email) {
        alert("Account created successfully! Please login to continue.");
      } else {
        alert("Account creation failed. Please try again.");
      }
      redirectLogin();
    }
  };
  let navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/");
  };
  return (
    <div className="PageContainer">
      <div className="SignUpBackgroundImg"></div>
      <div className="SignUpPage">
        <img src={Logo} className="LogoImg" alt="Background"></img>
        <div className="SignUpContainer">
          <div className="SignUpForm">
            <div className="SignUpTitle">
              <h2>Create an Account</h2>
            </div>
            <div className="PasswordRequirements">
              Password Requirements:
              <ul>
                <li>Must be at least 8 characters long</li>
                <li>Must contain at least one number</li>
              </ul>
            </div>
            <form onSubmit={handleUserSubmit}>
              <input
                className="SignUpInput"
                placeholder="First Name*"
                type={"firstName"}
                onChange={handleFirstNameChange}
                required
              ></input>
              <div className="ErrorMessage">{firstNameError}</div>
              <input
                className="SignUpInput"
                placeholder="Last Name*"
                type={"lastName"}
                onChange={handleLastNameChange}
                required
              ></input>
              <div className="ErrorMessage">{lastNameError}</div>
              <input
                className="SignUpInput"
                placeholder="Email*"
                type={"email"}
                onChange={handleEmailChange}
                required
              ></input>
              <div className="ErrorMessage">{emailError}</div>
              <input
                className="SignUpInput"
                placeholder="Password*"
                type={"password"}
                onChange={handlePasswordChange}
                required
              ></input>
              <div className="ErrorMessage">{passwordError}</div>
              <input
                className="SignUpInput"
                placeholder="Verify New Password"
                type={"VerifyPassword"}
                onChange={handleVerifyPasswordChange}
                required
              ></input>
              <div className="ErrorMessage">{verifyPasswordError}</div>
              <br />
              {/* <div className="SignUpTerms">
                By signing up, you agree to our{" "}
                <a href="https://www.google.com">Terms of Service</a> and{" "}
                <a href="https://www.google.com">Privacy Policy</a>.
              </div> */}
              <button className="SignUpBtn" onClick={handleUserSubmit}>
                Sign up
              </button>
            </form>
            <div className="AlreadyUser">
              Already have an account?
              <button className="SignInBtn" onClick={redirectLogin}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
