const initialAuthData = {
    isAuth: false,
    authToken: "",
    userData: {},
}


const authReducerFunction = (state, { type, payload }) => {
    const { isAuth, authToken, userData } = payload;
    switch(type) {
        case "AUTH_INIT":
            return({
                ...state,
                isAuth,
                authToken,
                userData
            });

        case "AUTH_CLEAR":
            return({ ...initialAuthData });

        default:
            return new Error("Error occured in authentication.")
    }
}

export { initialAuthData, authReducerFunction };
