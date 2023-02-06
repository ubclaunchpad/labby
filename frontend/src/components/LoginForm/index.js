import "./index.css";
import Hide from "../../assets/hide.png";
import { useDispatch } from "react-redux";
import {useState} from 'react';
import { AUTHENTICATE_USER} from "../../redux/actions/userActions";

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
              username: email,
              password: password,
            },
          });
          // need to handle authentication here
        console.log(email);
        console.log(password);
    }
    return(
        <div className="LoginPage">

    <div className="LoginContainer">
        <div className="LoginForm">
            <h1 className="LoginTitle">Login</h1>
            <form onSubmit={handleUserSubmit}>
                <input  className="LoginInput" placeholder="Email" onChange={handleEmailChange}>
                </input>
                <input  className="LoginInput" placeholder="Password" onChange={handlePasswordChange}>
                </input>
                <p1>
                    Forgot Password
                </p1>
                <button className="SignInBtn">
                    Sign In
                </button>
            </form>
            <p1>
                Create new account here
            </p1>
        </div>
    </div>
        </div>
    );

}

export default LoginForm;