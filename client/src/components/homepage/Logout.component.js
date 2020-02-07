import React from "react";
import "./Login.component.css";
import {Redirect} from "react-router-dom";

function Logout() {

    localStorage.removeItem('access_token');
    return <Redirect to='/'/>;
}

export default Logout;