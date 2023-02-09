import "./index.css";
// import Hide from "../../assets/hide.png";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import {useState} from 'react';
import { SIGNUP_USER } from "../../redux/actions/userActions";

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
            type: SIGNUP_USER,
            payload: {
              user_id: uuid(),
              fk_organization_id: null,
              username: null,
              email: email,
              password: password,
            },
          });
          // need to handle success/failure here
        console.log(email);
        console.log(password);
    }
    return(
        <div className="LoginPage">

    <div className="LoginContainer">
        <div className="LoginForm">
            <h1 className="LoginTitle">Create Account</h1>
            <form onSubmit={handleUserSubmit}>
                <input  className="LoginInput" placeholder="Email" onChange={handleEmailChange}>
                </input>
                <input  className="LoginInput" placeholder="Password" onChange={handlePasswordChange}>
                </input>
                <button className="SignInBtn">
                    Sign Up
                </button>
            </form>
        </div>
    </div>
        </div>
    );

}

export default LoginForm;