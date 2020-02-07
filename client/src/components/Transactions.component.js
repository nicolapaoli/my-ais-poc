import React, {Component} from "react";
import Title from "./common/Title.component";
import axios from "axios";
import {ListGroup} from "react-bootstrap";

class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: "Loading.."
        };
    }

    componentDidMount() {
        const access_token = localStorage.getItem("access_token");

        axios.post('http://localhost:5000/transactions',
            {
                "access_token": access_token, data: {
                    "limit": 20,
                    "order": "DESC",
                    "sort": "DATE"
                }
            }
        )
            .then(response => {
                console.log(response);
                const transactions = response.data.results;
                this.setState({
                    items: transactions.map(transaction => {
                        return (
                            <ListGroup.Item align="left">
                                <b>{new Date(transaction.transaction.date).toDateString()}</b>
                                &nbsp;&nbsp;&nbsp; {transaction.transaction.description}
                                &nbsp;&nbsp;&nbsp; {transaction.transaction.categoryType}
                                &nbsp;&nbsp;&nbsp; {transaction.transaction.amount}
                            </ListGroup.Item>
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
            <div><Title title="Your Last 20 Transactions"/>
                <ListGroup>{this.state.items}</ListGroup>
            </div>
        )
    }
}

export default Transactions;