import React from "react";

import Button from "../../components/Button.tsx";

import {OAUTH} from "../../common/constants.ts";
import {oauth} from "../../common/utils.ts";


function LoginButton() {
    const mutation = {
        isPending: false
    }

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const codeVerifier = oauth.generateCodeVerifier(OAUTH.CODE_VERIFIER_LENGTH)
        console.log(codeVerifier);
    }

    return <Button
        isLoading={mutation.isPending}
        className="btn btn-secondary" onClick={e => handleLogin(e)}>
        <div><span>Login with Google</span></div>
    </Button>
}

export default LoginButton;