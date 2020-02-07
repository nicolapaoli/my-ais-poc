import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

function Callback({location}) {
    const code = new URLSearchParams(location.search).get("code");
    axios.post('http://localhost:5000/auth/token', {"code": code})
        .then(res => {
            console.log(res.status);
            console.log(res.data.access_token);
            localStorage.setItem('access_token',res.data.access_token);
        })
        .catch(err => {
            console.log(`Err: ${err}`);
        });

    return <Redirect to="/"/>;
}

export default Callback;