import React from "react";
import "./Home.component.css";
import Button from "react-bootstrap/Button";


function Home() {

    return (
        <div className="contain-centered position-relative">
            <div className="container position-relative rounded">
                <h1>MyAIS</h1>
                <h6>Your money, all in one place</h6>
                <br/>
                <Button href="/accounts">Your Account</Button>&nbsp;
                <Button href="/transactions">Your Transactions</Button>
            </div>
        </div>

    )
}

export default Home;