import { useState } from "react";
import "./password-input.css";


export const PasswordInput = ({ id, name, placeholder, value, onChange }) => {
    const [pwVisibibleState, setPwVisibleState] = useState(false);

    const pwVisibilityHandler = (event) => {
        event.preventDefault();
        setPwVisibleState(!pwVisibibleState)
    }

    return(
        <div className="pw-inp-container">
            <input
                className="pw-inp"
                id={id}
                name={name}
                type={pwVisibibleState ? "text" : "password"}
                placeholder={placeholder} 
                minLength="6"
                required
                value={value}
                onChange={onChange}
            />
            {
                pwVisibibleState ?
                <button 
                    className="pw-hide-btn"
                    onClick={pwVisibilityHandler}
                >
                    <i className="fa-solid fa-eye-slash"></i>
                </button> :
                <button 
                    className="pw-hide-btn"
                    onClick={pwVisibilityHandler}
                >
                    <i className="fa-solid fa-eye"></i>
                </button>
            }
        </div>
    );
}