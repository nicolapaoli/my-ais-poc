import React, {Component} from "react";
import Title from "./common/Title.component";
import axios from "axios";
import {Button, Card} from "react-bootstrap";

class Accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: "Loading.."
        };
    }

    componentDidMount() {
        const access_token = localStorage.getItem("access_token");

        axios.post('http://localhost:5000/accounts', {"access_token": access_token})
            .then(response => {
                console.log(response);
                const accounts = response.data.accounts;
                this.setState({
                    items: accounts.map(account => {
                        return (
                            <Card id={account.id} style={{width: '18rem'}}>
                                <Card.Img variant="top" src={account.images.icon}/>
                                <Card.Body>
                                    <Card.Title>{account.accountNumber}</Card.Title>
                                    <Card.Text>
                                        Balance: <b>{account.balance} {account.currencyCode}</b><br/>
                                        Type: <b>{account.type}</b><br />
                                        ID: <b>{account.id}</b>
                                    </Card.Text>
                                    <Button variant="primary" href='/transactions'>See all Transactions</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                });
            })
            .catch(err => {
                console.log(`Err: ${err}`);
            });
    }


    render() {
        return (
            <div><Title title="Account List"/>
                <ul>{this.state.items}</ul>
            </div>
        )
    }
}

export default Accounts;