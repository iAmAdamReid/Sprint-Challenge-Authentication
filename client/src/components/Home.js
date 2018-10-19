import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';

class Home extends React.Component {
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <div className = 'home-container'>
            <h1>Welcome to our Jokes Page</h1>
            <h2>Wanna see some jokes? Be sure to <NavLink to = '/login'>Login!</NavLink></h2>
            <h2>Need an account? <NavLink to = '/register'>Register Here!</NavLink></h2>
            </div>
        )
}
}

export default withRouter(Home);