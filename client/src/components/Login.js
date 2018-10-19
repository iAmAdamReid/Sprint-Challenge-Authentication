import React from 'react';
import axios from 'axios';
import {withRouter, NavLink} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = event => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };
        let endpoint = `http://localhost:3300/api/login`;

        if(user.username.length < 3 || user.password.length < 8){
            window.alert('You must provide a username and a password.');
        } else {
        axios.post(endpoint, user)
        .then(res => {
            localStorage.setItem('jwt', res.data.token);
            // any redirects should go here
            this.props.history.replace('/jokes');
        })
        .catch(err => {
            console.log(err);
        })
    }
    }
    
    render(){
        return (
        <div className = 'login-container'>
        <h1>Log In</h1>
        <form onSubmit = {this.handleLogin}>
        <input type = 'text' name='username' value={this.state.username} onChange={this.handleInput} placeholder='Username'></input>
        <input type = 'password' name = 'password' value={this.state.password} onChange={this.handleInput} placeholder='Password'></input>
        <button type = 'submit'>Login</button>
        </form>

        <p>New user? Create an account <NavLink to = '/register'>here!</NavLink></p>

        </div>
        )
    }
}

export default withRouter(Login);