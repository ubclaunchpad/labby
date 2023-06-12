import "./index.css";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { RESET_PASSWORD } from "../../redux/actions/userActions";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoIcon.png";
import { ErrorToast } from "../../components/Toasts";

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const otp = window.location.pathname.split("/")[2];
    const [password, setPassword] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    function inputValidation() {
        if (password === "") {
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
            type: RESET_PASSWORD,
            payload: {
                otp: otp,
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
                            <h2>Reset Password</h2>
                        </div>
                        <form onSubmit={handleUserSubmit}>
                            <input className="LoginInput" placeholder="New Password" type={"password"} onChange={handlePasswordChange} />
                            <button className="ResetBtn" onClick={handleUserSubmit}>
                                Reset Password
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

export default ResetPassword;