import "./index.css";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { POST_USER } from "../../redux/actions/userActions";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoIcon.png";
import { ErrorToast } from "../../components/Toasts";

function SignUpForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    function inputValidation() {
        if (firstName === "" || lastName === "" || email === "" || password === "") {
            return { valid: false, message: "Please fill out all fields" };
        }
        return { valid: true, message: "" };
    }

    const handleUserSubmit = (e) => {
        e.preventDefault();
        const { valid, message } = inputValidation();

        if (!valid) {
            ErrorToast(message);
            return;
        }

        dispatch({
            type: POST_USER,
            payload: {
                user_id: uuid(),
                fk_organization_id: null,
                username: firstName + " " + lastName,
                email: email,
                employee: false,
                password: password,
                navTo: () => navigate("/"),
            },
        });
    }

    return (
        <div className="PageContainer">
            <div className="SignUpBackgroundImg" />
            <div className="LoginPage">
                <div className="LoginContainer">
                    <img src={Logo} className="LogoImg" alt="Background" />
                    <div className="LoginForm">
                        <div className="LoginTitle">
                            <h2>Create an Account</h2>
                        </div>
                        <form onSubmit={handleUserSubmit}>
                            <input className="LoginInput" placeholder="Email" type={"email"} onChange={handleEmailChange} />
                            <input className="LoginInput" placeholder="First Name" type={"text"} onChange={handleFirstNameChange} />
                            <input className="LoginInput" placeholder="Last Name" type={"text"} onChange={handleLastNameChange} />
                            <input className="LoginInput" placeholder="Password" type={"password"} onChange={handlePasswordChange} />
                            <button className="SignInBtn" data-testid="SignupButton" onClick={handleUserSubmit}>
                                Sign up
                            </button>
                        </form>
                    </div>
                    <div className="AlreadyUser">
                        <div>Already have an account?&nbsp;<NavLink to={`/`} data-testid="login">Log in</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;