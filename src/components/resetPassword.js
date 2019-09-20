import React from 'react';
import '../App.css'
import axios from "axios";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            userExists: false,
            reset: false,
            password: "",
            enterUser: true,
            notUser: false,
            id: ""
        };
        this.setUser = this.setUser.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.findUser = this.findUser.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.cancelReset = this.cancelReset.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    setUser(event) {
        if(event.target.value.length) {
            this.setState({
                user: event.target.value,
                notUser: false
            });
        }
    }
    findUser() {
        this.props.data.users.forEach((user)=>{
            if(user.userId === this.state.user) {
                this.setState({
                    userExists: true,
                    enterUser: false,
                    id: user._id.$oid
                })
            }
            if(!(user.userId === this.state.user)) {
                this.setState({
                    notUser: true
                })
            }

        });
    }

    cancelReset() {
        this.setState({
            user: "",
            userExists: false,
            reset: false,
            password: "",
            enterUser: true,
            notUser: false,
            id: ""
        });
        this.props.forgotPassword(false);
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    confirmPassword(event) {
        if(this.state.password === event.target.value) {
            this.setState({
                reset: true
            })
        }

    }
    async resetPassword() {
        const updateUserUrl = `https://api.mlab.com/api/1/databases/users/collections/photo-cloud-users/${this.state.id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`
        if(this.state.reset && this.state.id.length > 0) {
            await axios.put(updateUserUrl,{userId: this.state.user, password: this.state.password});
            this.setState({
                userExists: false,
                reset: false,
            });
            this.props.forgotPassword(false);
            this.props.canGetCloudUsers();
        }
    }
    render() {
            return (
                <div>
                    <section className="centered">
                        {this.state.enterUser &&
                        <div className="centered">
                            <h3 className="info">Please enter userId</h3>
                            {this.state.notUser &&
                            <h3 className="error">
                                Can not find the user
                            </h3>
                            }
                            <input placeholder="userId" className="input" onChange={this.setUser}/>
                            <button className="button" onClick={this.findUser}>Next</button>
                            <button className="button" onClick={this.cancelReset}>Cancel</button>

                        </div>
                        }
                        {this.state.userExists &&
                        <div className="centered">
                            <h3 className="info">Please enter password</h3>
                            <input placeholder="password" className="input" onChange={this.setPassword}/>
                            <h3 className="info">Please re-enter password</h3>
                            <input placeholder="confirm password" className="input" onChange={this.confirmPassword}/>
                            <button className="button" onClick={this.resetPassword}>Reset</button>
                            <button className="button" onClick={this.cancelReset}>Cancel</button>
                        </div>
                        }
                    </section>
                </div>
            );
    }
}


