import React, {useState} from "react";

import AuthService from "../services/auth.service";
import {useHistory} from "react-router-dom";
import Message from "./Message";
import '../css/login.css'


function Login({login, logout}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [register, setRegister] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('')

    function submitHandler(event) {
        event.preventDefault();

        if (username.trim() && password.trim()) {
            if (!register)
                AuthService.login(username, password).then(() => {
                    login();
                    setMessage('')
                    setColor('')
                    history.push('/todo')
                }).catch((error) => {
                    logout()
                    if (error.response === undefined) {
                        setMessage(error.message)
                        setColor('RED')
                    } else if (error.response.status === 401) {
                        let message = 'Invalid login or password'
                        setMessage(message)
                        setColor('RED')
                    }

                })
            else {
                AuthService.register(username, password).then(() => {
                    setMessage('successfully registered')
                    setColor('GREEN')
                }).catch((error) => {
                    if (error.response === undefined) {
                        setMessage(error.message)
                        setColor('RED')
                    } else {
                        setMessage(error.response.data)
                        setColor('RED')
                    }
                })
            }
            setUsername('');
            setPassword('');
        }
    }

    return (
        <div className="loginForm">
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <label htmlFor="username">Username</label>
                    <br/>
                    <input type="text" value={username} onChange={event => {
                        setUsername(event.target.value)
                    }}/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" value={password} onChange={event => {
                        setPassword(event.target.value)
                    }}/>
                </div>

                <div className="buttons">
                    <button type='submit' onClick={() => setRegister(false)}>
                        <span>Login</span>
                    </button>

                    <button type="submit" onClick={() => setRegister(true)}>
                        Register
                    </button>
                </div>
                {message ? <Message style={{padding: "10px"}} color={color} message={message}/> : undefined}
            </form>

        </div>
    );
}

export default Login;