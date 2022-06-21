import axios from "axios";

export const loginService = (userEmail) => {
    const response = axios.post("/api/auth/login", userEmail);
    return(response);
}