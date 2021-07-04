import React, { Component} from "react";
import { BrowserRouter,Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

class App extends Component {
    render() {
        return (
            <div className="site">
                <main>
                    
                    <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"} component={Login}/>
                        <Route path={"/dashboard"} component={Dashboard}/>
                   </Switch></BrowserRouter>
                    
               </main>
            </div>
        );
    }
}

export default App;