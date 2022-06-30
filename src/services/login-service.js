import axios from "axios";

export const loginService = (loginCreds) => {
    const response = axios.post("/api/auth/login", loginCreds);
    return(response);
}