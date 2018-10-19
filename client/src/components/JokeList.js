import React from 'react';
import axios from 'axios';
import {NavLink, withRouter} from 'react-router-dom';

class JokeList extends React.Component {

    componentDidMount(){
        this.fetchJokes();
    }

    constructor(props){
        super(props);

        this.state = {
            jokes: []
        }
    }

    fetchJokes(){
        const token = localStorage.getItem('jwt');
        const endpoint = `http://localhost:3300/api/jokes`;
        const options = {
            headers: {
                Authorization: token,
            },
        }
        axios.get(endpoint, options)
        .then(res => {
            this.setState({
                jokes: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        // TODO: filter out repeat jokes returned from the API
        if(localStorage.getItem('jwt')){
            return (
                <div className = 'joke-list-container'>
                <h1>Check out these groaners!</h1>
                {this.state.jokes.map(joke => {
                    return <div key = {joke.id} className = 'joke-container'>
                    <div>{joke.setup}</div>
                    <div>{joke.punchline}</div>

                    </div>
                })}
                
                </div>
            )
        } else {
            return (
                <div className = 'joke-list-container'>
                    <h1>You gotta be <NavLink to = '/login'>logged in</NavLink> to get these jokes!</h1>
                </div>
            )
        }

        
    }
}

export default withRouter(JokeList);