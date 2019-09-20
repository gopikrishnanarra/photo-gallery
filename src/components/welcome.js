/* eslint-disable */
import React, { Component } from "react";

function onCreate() {
    this.props.welcomePage(false)
    this.props.createUser(true)
}
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordMissMatch: "",
            userExists: "",
            user: {}
        };
    }

    render() {
        return (
            <section className="centered">
                        <div className="welcome">
                            WELCOME
                        </div>
                        <div className="header">
                            Login to Photo Cloud Gallery
                        </div>
                <button className="button" onClick={()=>this.props.welcomePage(false)}>
                    login
                </button>
                <button className="button" onClick={()=>onCreate.call(this)}>
                    create
                </button>
                    </section>
        );
    }
}
