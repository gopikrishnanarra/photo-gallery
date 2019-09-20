import React from 'react';
import '../App.css'
import axios from "axios";

export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            admin: "",
            password: "",
            userExists: false
        };
        this.setUser = this.setUser.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.addUser = this.addUser.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    setUser(event) {
        if(event.target.value.length) {
            const found = this.props.data.users.find((user)=>{
                return user.userId === event.target.value
            });
            if(found) {
                this.setState({
                    userExists: true
                })
            }
            if(!found) {
                this.setState({
                    userExists: false
                })
            }
            this.setState({
                user: event.target.value
            });
        }
    }

    cancel() {
        this.setState({
            user: "",
            userExists: false,
            password: "",
            admin: "",
        });
        this.props.createUser(false);
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    async addNewUser() {
        if(!this.state.userExists) {
            const addUserUrl = 'https://api.mlab.com/api/1/databases/users/collections/photo-cloud-users?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ';
            try {
                await axios.post(addUserUrl, {
                    userId: this.state.user,
                    password: this.state.password
                });
                this.props.createUser(false);
                this.props.welcomePage(true);
            } catch (e) {
                console.log(e.error.message)
            }
        }
    }

    async addUser() {
        const found = this.props.data.users.find((user)=>{
            return user.userId === this.state.user
            });
        if(found) {
            this.setState({
                userExists: true
            })
        }
        if(!found) {
            this.setState({
                userExists: false
            })
            await this.addNewUser();
        }
    }
    render() {
        function addUserDisabled() {
            return this.state.userExists === true || !this.state.user.length || !this.state.password.length;
        }

        return (
            <div>
                <section className="centered">
                    <div className="centered">
                        <h3 className="info">Please enter userId</h3>
                        {this.state.userExists &&
                        <h3 className="error">user name already taken</h3>
                        }
                        <input placeholder="userId" className="input" onChange={this.setUser}/>
                        <h3 className="info">Please enter password</h3>
                        <input placeholder="password" className="input" onChange={this.setPassword}/>
                        <button className="button" disabled={addUserDisabled.call(this)} onClick={this.addUser}>Add User</button>
                        <button className="button" onClick={this.cancel}>Cancel</button>

                    </div>
                </section>
            </div>
        );
    }
}


