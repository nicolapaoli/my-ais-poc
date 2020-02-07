import React from "react";
import "./Login.component.css";
import AuthLink from "./AuthLink.component";

function Login() {

    return (
        <div className="contain-centered position-relative">
            <div className="container position-relative rounded">
                <h1>MyAIS</h1>
                <h6>Your money, all in one place</h6>
                <br/>
                <AuthLink/>
            </div>
        </div>

    )
}

export default Login;