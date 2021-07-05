import React, { Component} from "react";
import { BrowserRouter,Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Data from './components/Data'
import Upload from "./components/upload";


class App extends Component {


    render() {
        return (
            <div className="site">
                <main>
                    
                    <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"} component={Login}/>
                        <Route path={"/dashboard"} component={Dashboard}/>
                        <Route path={"/data"} component={Data} />
                        <Route path={"/upload"} component={Upload} />
                   </Switch></BrowserRouter>
                    
               </main>
            </div>
        );
    }
}

export default App;