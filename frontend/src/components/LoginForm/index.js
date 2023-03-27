import "./index.css";
// import Hide from "../../assets/hide.png";
import Logo from "../../assets/LogoIcon.png";
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { AUTHENTICATE_USER } from "../../redux/actions/userActions";
import { NavLink , useNavigate} from "react-router-dom";

function LoginForm({ from }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [rememberMe, setRememberMe] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    
    let navigate = useNavigate();
    const handleUserSubmit = (e) => {
        e.preventDefault();
        let errors = false;
        
        if (rememberMe) {
            localStorage.setItem('loginEmail', email);
            localStorage.setItem('rememberMe', rememberMe);
        } else {
            localStorage.removeItem('loginEmail');
            localStorage.removeItem('rememberMe');
        }
        
        if (email === "") {
            setEmailError("Error: Please enter a valid email");
            errors = true;
        }
        if (password === "") {
            setPasswordError("Error: Please enter your password");
            errors = true;
        }
        if (!errors) {
            dispatch({
                type: AUTHENTICATE_USER,
                payload: {
                email: email,
                password: password,
                },
            });
            navigate(from);
        }
    }
    useEffect(() => {
        const storedEmail = localStorage.getItem('loginEmail');
        const storedRememberMe = localStorage.getItem('rememberMe');
    
        if (storedEmail) {
          setEmail(storedEmail);
        }
    
        if (storedRememberMe === 'true') {
          setRememberMe(true);
        }
      }, []);

    return(
    <div className="PageContainer">

        <div className="LoginPage">
            <img src={Logo} className="LogoImg" alt="Labby Logo"></img>

            <div className="LoginContainer">
                <div className="LoginForm">
                    <div className="LoginTitle">
                        <h2>Log in</h2>
                    </div>
                    <form onSubmit={handleUserSubmit}>
                        <input  className="LoginInput" placeholder="Email" type={"email"} onChange={handleEmailChange}>
                        </input>
                        <div className="ErrorMessage">{emailError}</div>
                        <input  className="LoginInput" placeholder="Password" type={"password"} onChange={handlePasswordChange}>
                        </input>
                        <div className="ErrorMessage">{passwordError}</div>
                        <div className="RememberMe">
                            <input type="checkbox" id="rememberMe" name="rememberMe" />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button className="SignInBtn" onClick={handleUserSubmit}>
                            Log in
                        </button>
                    </form>
                </div>
                    <div className="CreateAccount">
                        <div>Don't have an account yet?&nbsp;</div>
                        <NavLink
                        to={`/signup`}
                        >
                        Create Account 
                        </NavLink>  
                    </div>
                    <br></br>
                    <div className="ForgotPassword">
                        <NavLink
                        to={`/forgotpassword`}
                        >
                        Forgot your password?
                        </NavLink>
                    </div>
            </div>
        </div>
        <div className="BackgroundImg">
            </div>
    </div>
    );

}

export default LoginForm;