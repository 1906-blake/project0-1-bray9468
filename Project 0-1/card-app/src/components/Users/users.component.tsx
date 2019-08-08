import React, { Component } from 'react'
import user from '../../models/user'
//import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { environment } from '../../environment';


interface IState {
  users: user[]
    }


export default class Reimbursement extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }


    async componentDidMount() {
      this.getReimbursement();
      
    };

    getReimbursement = async () => {
        const resp = await fetch('http://localhost:8012/users', {
            method: 'get'
        });
        const usersFromServer = await resp.json();
        this.setState({
            users: usersFromServer,
            
        });
        console.log(usersFromServer);
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
        const users = this.state.users;
        return (
            <div id="Reimbursement-table-container">
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
                            <th scope="col">user_ID</th>
                            <th scope="col">username</th>
                            <th scope="col">password</th>
                            <th scope="col">firstname</th>
                            <th scope="col">lastname</th>
                            <th scope="col">email</th>
                            <th scope="col">role </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(users =>
                                <tr key={'userId-' + users.user_id}>
                                    <td>{users.user_id}</td>
                                    <td>{users.username}</td>
                                    <td>{users.password}</td>
                                    <td>{users.firstName}</td>
                                    <td>{users.lastName}</td>
                                    <td>{users.email}</td>
                                    <td>{users.role.role}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
