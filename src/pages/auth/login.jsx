import "./auth.css"
import "../../styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    const initialLoginCreds = { email: "", password: "" };
    const [loginCreds, setLoginCreds] = useState(initialLoginCreds);
    const { email, password } = loginCreds;

    const updateLoginCreds = (event) => {
        const { name, value } = event.target;
        setLoginCreds((loginCreds) => ({ ...loginCreds, [name]: value}))
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
                    <input
                        className="inp"
                        name="password"
                        type="password"
                        placeholder="******" 
                        required
                        value={password} 
                        onChange={updateLoginCreds}
                    />
                </label>
                <div className="form-btn-container flex-col">
                    <button
                        className="auth-btn pri-btn btn"
                    >
                        Continue
                    </button>
                    <button
                        className="auth-btn sec-btn btn"
                    >
                        Continue as Guest
                    </button>
                </div>
            </form>

            <p className="alt-cta">New user? <Link to="/signup" className="alt-cta-btn" >Sign Up</Link> here.</p>
        </div>
    );
}