import "./auth.css"
import "../../styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { signupService } from "../../services/signup-service";
import { useAuth } from "../../contexts/auth-context";
import { useToast } from "../../custom-hook";

export const Signup = () => {
    const { showToast } = useToast();

    const { authState, authDispatch } = useAuth();
    const { authToken } = authState;

    const initialUserDetails = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    }
    const [ userDetails, setUserDetails ] = useState(initialUserDetails);
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName
    } = userDetails;

    const updateUserDetails = (event) => {
        const { name, value } = event.target;
        setUserDetails((userDetails) => ({ ...userDetails, [name]: value }))
    }

    const signupHandler = async (event) => {
        event.preventDefault();

        try {
            if (!email || !password || !confirmPassword || !firstName || !lastName) {
                showToast("warning", "All fields must be filled.");
                return;
            }

            const response = await signupService(userDetails);
            const { createdUser, encodedToken } = response.data;

            authDispatch({
                type: "AUTH_INIT",
                payload: {
                    isAuth: true,
                    authToken: encodedToken,
                    userData: { ...createdUser }
                }
            })

            localStorage.setItem("auth-token", authToken);
        } catch (error) {
            console.log("SIGNUP_ERROR: ", error);
            if (error.message.includes(422)) {
                showToast("error", "Email already exists. Login instead")
                return;
            }
            
            showToast("error", "Error occured while signing in.");
        }
    }


    return(
        <div className="auth-form-wrapper">
            <form className="auth-form flex-col">
                <h1 className="auth-heading">Signup</h1>
                
                <label
                    className="auth-label flex-col"
                    htmlFor="firstName"
                >
                    First Name: 
                    <input 
                        id="firstName"
                        className="inp"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                        required
                        onChange={updateUserDetails}
                        value={firstName}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="lastName"
                >
                    Last Name: 
                    <input 
                        id="lastName"
                        className="inp"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        onChange={updateUserDetails}
                        value={lastName}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="email"
                >
                    Email: 
                    <input 
                        id="email"
                        className="inp"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        onChange={updateUserDetails}
                        value={email}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="newPassword"
                >
                    New Password:
                    <input
                        id="newPassword"
                        className="inp"
                        name="password"
                        type="password"
                        placeholder="******" 
                        required
                        onChange={updateUserDetails}
                        value={password}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="confirmPassword"
                >
                    Confirm Password:
                    <input
                        className="inp"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter password" 
                        required
                        onChange={updateUserDetails}
                        value={confirmPassword}
                    />
                </label>
                <div className="form-btn-container flex-col">
                    <button
                        className="auth-btn pri-btn btn"
                        onClick={signupHandler}
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}