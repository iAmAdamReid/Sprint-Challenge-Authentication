import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount(){
        this.handleLogout();
    }

    handleLogout(){
        localStorage.removeItem('jwt');
        console.log(this.props);
        setTimeout(() => {
            this.props.history.replace('/');
        }, 3000)
    }

    render(){
        return(
            <div className = 'logout-container'>
            <h1>Thanks for the laughs!</h1>

            <p>Logging out. If this page does not automatically redirect you, click <NavLink to = '/'>here.</NavLink></p>
            </div>
        )
    }
}

export default withRouter(Logout);