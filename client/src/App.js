import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/homepage/Login.component";
import Accounts from "./components/Accounts.component";
import Transactions from "./components/Transactions.component";
import MyNav from "./components/common/Nav.component";
import Callback from "./components/Callback.component";
import Home from "./components/homepage/Home.component";
import Logout from "./components/homepage/Logout.component";
import {Switch} from "react-bootstrap";

function App() {

    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
        return (
            <div className="App">
            <Router>
                <Route path="/callback" component={Callback}/>
                <Route path="/"><Login/></Route>
            </Router>
            </div>
        )
    }
    return (
        <div className="App">
            <MyNav/>
            <Router>
                <Route exact path="/">
                    <Home/>`
                </Route>
                <Route path="/accounts">
                    <Accounts/>
                </Route>
                <Route path="/transactions">
                    <Transactions/>
                </Route>
                <Route path="/logout">
                    <Logout/>
                </Route>

            </Router>
        </div>
    );
}

export default App;
