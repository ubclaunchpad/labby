import "./index.css";
import Logo from "../../assets/LogoIcon.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AUTHENTICATE_USER, REQUEST_RESET } from "../../redux/actions/userActions";
import { NavLink, useNavigate } from "react-router-dom";
import { ErrorToast } from "../../components/Toasts";

function LoginForm({ from }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: AUTHENTICATE_USER,
      payload: {
        email: email,
        password: password,
      },
    });
    if (from === "/settings") {
      from = "/";
    }
    navigate(from);
  };

  function handleUserResetRequest() {
    if (email === "") {
      ErrorToast("Please fill out your email above, leave the password blank and retry!");
      return;
    }

    dispatch({
      type: REQUEST_RESET,
      payload: {
        email: email,
      },
    });
  };

  return (
    <div className="PageContainer">
      <div className="LoginPage">
        <div className="LoginContainer">
          <img src={Logo} className="LogoImg" alt="Labby Logo" />
          <div className="LoginForm">
            <div className="LoginTitle">
              <h2>Log in</h2>
            </div>
            <form onSubmit={handleUserSubmit}>
              <input
                className="LoginInput"
                placeholder="Email"
                type={"email"}
                onChange={handleEmailChange}
              />
              <input
                className="LoginInput"
                placeholder="Password"
                type={"password"}
                onChange={handlePasswordChange}
              />
              <div className="ForgotPassword" onClick={() => { handleUserResetRequest() }}>
                Forgot My Password
              </div>
              <button className="SignInBtn" onClick={handleUserSubmit}>
                Log in
              </button>
            </form>
          </div>
          <div className="CreateAccount">
            <div>Not a user? Create an account&nbsp;<NavLink to={`/signup`} data-testid="signup">here.</NavLink></div>
          </div>
        </div>
      </div>
      <div className="BackgroundImg"></div>
    </div>
  );
}

export default LoginForm;
