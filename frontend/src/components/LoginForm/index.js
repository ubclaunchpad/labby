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
        if (rememberMe) {
            localStorage.setItem('loginEmail', email);
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('loginEmail');
            localStorage.removeItem('rememberMe');
          }
        dispatch({
            type: AUTHENTICATE_USER,
            payload: {
              email: email,
              password: password,
            },
          });
          navigate(from);
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
                        <input  className="LoginInput" placeholder="Password" type={"password"} onChange={handlePasswordChange}>
                        </input>
                        <div className="RememberMe">
                            <input type="checkbox" id="rememberMe" name="rememberMe" />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button className="SignInBtn" onClick={handleUserSubmit}>
                            Log in
                        </button>
                    </form>
                </div>
                    <div className="ForgotPassword">
                        <NavLink
                        to={`/forgotpassword`}
                        >
                        Forgot password?
                        </NavLink>
                    </div>
                    <div className="CreateAccount">
                        <div>Not a user? Create an account&nbsp;</div>
                        <NavLink
                        to={`/signup`}
                        >
                        here. 
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