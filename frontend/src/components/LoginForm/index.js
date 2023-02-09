import "./index.css";
// import Hide from "../../assets/hide.png";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { AUTHENTICATE_USER } from "../../redux/actions/userActions";

function LoginForm() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleUserSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: AUTHENTICATE_USER,
            payload: {
              email: email,
              password: password,
            },
          });
    }

    return(
        <div className="LoginPage">

    <div className="LoginContainer">
        <div className="LoginForm">
            <h1 className="LoginTitle">Login</h1>
            <form onSubmit={handleUserSubmit}>
                <input  className="LoginInput" placeholder="Email" type={"email"} onChange={handleEmailChange}>
                </input>
                <input  className="LoginInput" placeholder="Password" type={"password"} onChange={handlePasswordChange}>
                </input>
                <div>
                    Forgot Password
                </div>
                <button className="SignInBtn" onClick={handleUserSubmit}>
                    Sign In
                </button>
            </form>
            <div>
                Create new account here
            </div>
        </div>
    </div>
        </div>
    );

}

export default LoginForm;