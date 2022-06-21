import axios from "axios";

export const signupService = (userData) => {
    const response = axios.post("/api/auth/signup", userData);
    return(response)
}