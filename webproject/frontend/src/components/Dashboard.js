import React, { Component} from "react";
import { Link } from "react-router-dom";
// import { Button } from "reactstrap";

class App extends Component {
    render() {
        return (
            <Link to='/data' className='btn btn-success'>Show Data</Link>
        );
    }
}

export default App;