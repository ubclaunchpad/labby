import "./index.css";
import Logo from "../../assets/LogoIcon.png";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AUTHENTICATE_USER } from "../../redux/actions/userActions";
import { NavLink, useNavigate } from "react-router-dom";

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

  return (
    <div className="PageContainer">
      <div className="LoginPage">
        <img src={Logo} className="LogoImg" alt="Labby Logo"></img>
        <div className="LoginContainer">
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
              <div className="ForgotPassword">
                Forgot My Password
              </div>
              <button className="SignInBtn" onClick={handleUserSubmit}>
                Log in
              </button>
            </form>
          </div>
          <div className="CreateAccount">
            <div>Not a user? Create an account&nbsp;</div>
            <NavLink to={`/signup`} data-testid="signup">here.</NavLink>
          </div>
        </div>
      </div>
      <div className="BackgroundImg"></div>
    </div>
  );
}

export default LoginForm;
