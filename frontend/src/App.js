import React, {useState} from "react";
import {Switch, Route, Link} from "react-router-dom";
import Home from "./components/Home";
import TodoList from "./components/TodoList";
import SecuredRoute from "./components/SecuredRoute";
import AuthService from "./services/auth.service";


function App() {
    const [login, setLogin] = useState(!!AuthService.getCurrentUser())

    function logIn() {
        setLogin(true)
    }

    function logOut() {
        setLogin(false)
    }

    return (
        <div>
            <div className='header'>
                <h2><Link style={{textDecoration: 'none', color: 'black'}} to="/">Home</Link></h2>
                <h2><Link style={{textDecoration: 'none', color: 'black'}} to="/todo">Todo list</Link></h2>
                <div className='logout'>
                    {login ? <button onClick={() => {
                        AuthService.logout();
                        logOut()
                    }}>Logout
                    </button> : undefined}
                </div>

            </div>

            <hr/>

            <div className='content'>
                <Switch>
                    <Route exact path="/">
                        <Home logIn={logIn} logOut={logOut}/>
                    </Route>
                    <SecuredRoute path="/todo" component={TodoList} login={login}/>
                </Switch>
            </div>
        </div>

    );
}

export default App;
