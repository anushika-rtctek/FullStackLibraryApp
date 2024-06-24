import { useOktaAuth } from "@okta/okta-react"
import { SpinnerLoading } from "../layout/Utils/SpinnerLoading"
import { Redirect } from "react-router-dom"
import OktaSigninWidget from "./OktaSigninWidget"

const LoginWidget = ({ config }) => {

    const { oktaAuth, authState } = useOktaAuth();
    console.log('authState', authState);

    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens)
    }

    const onError = (err) => {
        console.log("Sign in Error: ", err);
    }

    if (!authState) {
        return (
            <SpinnerLoading />
        )
    }

    return authState.isAuthenticated ?
        <Redirect to={{ pathname: '/' }} /> :
        <OktaSigninWidget config={config} onSuccess={onSuccess} onError={onError} />
}

export default LoginWidget