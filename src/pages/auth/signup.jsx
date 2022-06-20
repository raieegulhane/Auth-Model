import "./auth.css"
import "../../styles.css";
import { useState } from "react";

export const Login = () => {
    

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
                        className="inp"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                        required
                        // value={email}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="lastName"
                >
                    Last Name: 
                    <input 
                        className="inp"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                        required
                        // value={email}
                    />
                </label>
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
                        // value={email}
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="newPassword"
                >
                    Password:
                    <input
                        className="inp"
                        name="newPassword"
                        type="password"
                        placeholder="******" 
                        required
                        // value={password}                   
                    />
                </label>
                <label
                    className="auth-label flex-col"
                    htmlFor="confirmPassword"
                >
                    Password:
                    <input
                        className="inp"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter password" 
                        required
                        // value={password}                   
                    />
                </label>
                <div className="form-btn-container flex-col">
                    <button
                        className="auth-btn pri-btn btn"
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}