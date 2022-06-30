import "./auth.css"
import "../../styles.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PasswordInput } from "../../components";
import { loginService } from "../../services";
import { useToast } from "../../custom-hook";
import { useAuth } from "../../contexts/auth-context";

export const Login = () => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const { authState: { isAuth }, authDispatch } = useAuth();

    const initialLoginCreds = { email: "", password: "" };
    const [loginCreds, setLoginCreds] = useState(initialLoginCreds);
    const { email, password } = loginCreds;

    const updateLoginCreds = (event) => {
        const { name, value } = event.target;
        setLoginCreds((loginCreds) => ({ ...loginCreds, [name]: value}))
    }

    // when you go back you dont want to return to login page
    // this is not present in signup page beacuse in private routes we navigate to login
    // and we dont want that. even when you signup and hit back button you will be navigated to login
    useEffect(() => {
        isAuth && navigate(location?.state?.from ? location.state.from : "/home", { replace: true });
    }, [isAuth])

    const loginHandler = async (event, formData, guestLoginStatus) => {
        event.preventDefault();

        try {
            const response = await loginService(formData);
            const { foundUser, encodedToken } = response.data;

            authDispatch({
                type: "AUTH_INIT",
                payload: {
                    isAuth: true,
                    authToken: encodedToken,
                    userData: { ...foundUser }
                }
            });
            localStorage.setItem("auth-token", encodedToken);
            localStorage.setItem("user-data", JSON.stringify(foundUser));

            navigate(location?.state?.from ? location.state.from : "/home", { replace: true });

            guestLoginStatus ?
                showToast("success", "Logged in as guest.") :
                showToast("success", "Login successful.");
        } catch (error) {
            console.log("LOGIN_ERROR: ", error);
            if(error.message.includes(404)) {
                if (!email || !password) {
                    showToast("warning", "All fields must be filled.");
                }
                if (email) {
                    showToast("error", "Email not registered. Please sign up to continue.");
                }
                return;
            }
            if(error.message.includes(401)) {
                if (email && password) {
                    showToast("error", "Incorrect email or password.");
                }
                return;
            }
            showToast("error", "Error occured while logging in.");
        }
    }

    const guestLoginHandler = async (event) => {
        event.preventDefault();

        setLoginCreds((loginCreds) => ({ ...loginCreds, email: "janedoe@example.com", password: "janeDoe123"}))
        loginHandler(event, { email: "janedoe@example.com", password: "janeDoe123"}, true);
    }


    return(
        <div className="auth-form-wrapper">
            <form className="auth-form flex-col">
                <h1 className="auth-heading">Login</h1>
                
                <label
                    className="auth-label flex-col"
                    htmlFor="email"
                >
                    Email: 
                    <input 
                        className="inp"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        value={email}
                        onChange={updateLoginCreds}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="password"
                >
                    Password:
                    <PasswordInput
                        id={"password"}
                        name={"password"}
                        placeholder={"******"}
                        value={password}
                        onChange={updateLoginCreds}
                    />
                </label>
                

                <div className="form-btn-container flex-col">
                    <button
                        className="auth-btn pri-btn btn"
                        onClick={(e) => loginHandler(e, loginCreds, false)}
                    >
                        Continue
                    </button>
                    <button
                        className="auth-btn sec-btn btn"
                        onClick={(guestLoginHandler)}
                    >
                        Continue as Guest
                    </button>
                </div>
            </form>

            <p className="alt-cta">New user? <Link to="/signup" className="alt-cta-btn" >Sign Up</Link> here.</p>
        </div>
    );
}