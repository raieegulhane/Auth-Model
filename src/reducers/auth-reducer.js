const initialAuthData = {
    isAuth: false,
    authToken: "",
    userData: {},
}


const authReducerFunction = (state, { type, payload }) => {
    switch(type) {
        case "AUTH_INIT":
            return({
                ...state,
                isAuth: payload.isAuth,
                authToken: payload.authToken,
                userData: payload.userData
            });

        case "AUTH_CLEAR":
            return({ ...initialAuthData });

        default:
            return new Error("Error occured in authentication.")
    }
}

export { initialAuthData, authReducerFunction };
