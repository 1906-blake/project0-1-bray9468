import React, { Component } from 'react'
import Card from '../../models/card';
import Reimbursement from '../models/Reimbursement'

interface IState {
    cards: Reimbursement[]
}

export default class reimbursement extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            cards: []
        };
    }

    async componentDidMount() {
        const resp = await fetch('http://localhost:8012/reimbursements', {
            credentials: 'include'
        });
        const cardsFromServer = await resp.json();
        this.setState({
            cards: cardsFromServer
        });
        console.log(cardsFromServer);
    }

    render() {
        const reimbursement = this.state.reimbursement;
        return (
            <div id="reimbursement-table-container">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">re_id</th>
                            <th scope="col">author</th>
                            <th scope="col">description</th>
                            <th scope="col">date_submitted</th>
                            <th scope="col">date_resolved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Reimbursement.map(Reimbursement =>
                                <tr key={'reId-'+Reimbursement.re_id}>
                                    <td>{Reimbursement.author}</td>
                                    <td>{Reimbursement.description}</td>
                                    <td>{Reimbursement.date_submitted}</td>
                                    <td>{Reimbursement.date_resolved}</td>
                                 
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
