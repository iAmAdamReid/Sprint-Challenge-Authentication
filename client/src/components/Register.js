import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Register extends React.Component {
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

    handleRegister = event => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };
        let endpoint = `http://localhost:3300/api/register`;

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
    
    render(){
        return (
        <div className = 'register-container'>
        
        <form onSubmit = {this.handleRegister}>
        <input type = 'text' name='username' value={this.state.username} onChange={this.handleInput} placeholder='Username'></input>
        <input type = 'password' name = 'password' value={this.state.password} onChange={this.handleInput} placeholder='Password'></input>
        <button type = 'submit'>Register</button>
        </form>

        </div>
        )
    }
}

export default withRouter(Register);