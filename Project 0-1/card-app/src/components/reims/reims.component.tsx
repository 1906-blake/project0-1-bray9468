import React, { Component } from 'react'
import reimbursement from '../../models/Reimbursement'
//import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



interface IState {
  reims: reimbursement[]
    }


export default class Reimbursement extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reims: []
        };
    }


    async componentDidMount() {
      this.getReimbursement();
      
    };

    getReimbursement = async () => {
        const resp = await fetch('http://localhost:8012/reimbursements', {
            method: 'get'
            
           
        });
        const reimsFromServer = await resp.json();
        this.setState({
            reims: reimsFromServer,
            
        });
        console.log(reimsFromServer);
    }

    // getReimbursementById = async (reimbursement: Reimbursement) => {
    //     const resp = await fetch(environment.context +'/reimbursements/:re_id' + reimbursement.re_id, {
    //         credentials: 'include'
    //     });
    //     const cardsFromServer = await resp.json();
    //     this.setState({
    //         cards: cardsFromServer,
    //         gameDropdown: {
    //             ...this.state.gameDropdown,
    //             selection: game.name
    //         }
    //     });
    //     console.log(cardsFromServer);
    // }

    // getGames = async () => {
    //     const resp = await fetch(environment.context + '/games', {
    //         credentials: 'include'
    //     });
    //     const games = await resp.json();
    //     this.setState({
    //         games
    //     });
    // }

    // toggleGameDropdown = () => {
    //     this.setState({
    //         gameDropdown: {
    //             ...this.state.gameDropdown,
    //             isOpen: !this.state.gameDropdown.isOpen
    //         }
    //     });
    // }

    render() {
        const reims = this.state.reims;
        return (
          

            <div id="Reimbursement-table-container"> <h1>Empire Reimbursements</h1>

{/* <input name="statusId"
            type="number"
            value={this.state.statusId}
            onChange={this.updatestatusId}></input>

        <Button co onClick={this.findNewPokemon}>Find By Status</Button> */}
                {/* <ButtonDropdown id="card-game-dropdown"
                        isOpen={this.state.gameDropdown.isOpen} 
                        toggle={this.toggleGameDropdown}>

                    <DropdownToggle caret>
                        {this.state.gameDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getCards}>All</DropdownItem>
                        <DropdownItem divider />
                        {
                            this.state.games.map(game => (
                                <DropdownItem key={'game-dropdown-' + game.id} 
                                            onClick={() => this.getCardsByGameId(game)}>
                                 {game.name}
                                 </DropdownItem>
                            ))
                        }
                    </DropdownMenu>
                </ButtonDropdown> */}
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Reimbursement ID</th>
                            <th scope="col">author</th>
                            <th scope="col">amount</th>
                            <th scope="col">date_submitted</th>
                            <th scope="col">date_resolved</th>
                            <th scope="col">description</th>
                            <th scope="col">resolver</th>
                            <th scope="col">status</th>
                            <th scope="col">type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reims.map(reimbursement=>
                                <tr key={'re_id-' + reimbursement.re_id}>
                                    <td>{reimbursement.re_id}</td>
                                    <td>{reimbursement.author}</td>
                                    <td>{reimbursement.amount}</td>
                                    <td>{reimbursement.date_submitted}</td>
                                    <td>{reimbursement.date_resolved}</td>
                                    <td>{reimbursement.description}</td>
                                    <td>{reimbursement.resolver}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.type.type}</td>
                                   
                                    
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
