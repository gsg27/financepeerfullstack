import React , { Component } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'reactstrap';


class Logout extends Component{
    state = {
        navigate: false
    };


    logout = () => {
        localStorage.clear("access_token");
        this.setState({ navigate: true});
    };

    render(){
        const { navigate } = this.state;

        if (navigate){
            return <Redirect to='/' push={true} />
        }

        return <Button className='btn btn-danger' onClick={this.logout}>LogOut`</Button>
    }
}

export default Logout;