import {React, useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import './style.css'

const AuthPage = props => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, clearErr, request } = useHttp()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        message(error)
        clearErr()
    }, [error, message, clearErr])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (error) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (error) {}
    }

    const changeHandler = e => {
        setForm({ ...form,  [e.target.name]: e.target.value })
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link reducer</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div>

                        <div className="input-field">
                            <input 
                                placeholder="Enter e-mail" 
                                id="email" 
                                type="email" 
                                name="email"
                                className="yellow-input"
                                onChange={ changeHandler }
                            />
                            <label htmlFor="email">E-mail</label>
                        </div>

                        <div className="input-field">
                            <input 
                                placeholder="Enter password" 
                                id="password" 
                                type="password" 
                                name="password"
                                className="yellow-input"
                                onChange={ changeHandler }
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        </div>
                    </div>
                <div className="card-action">
                    <button 
                        className="btn yellow darken-4 btn-space"
                        onClick={ loginHandler }
                        disabled = { loading }
                    >Login</button>
                    <button 
                        className="btn grey lighten-1 black-text btn-space"
                        onClick = { registerHandler }
                        disabled = { loading }
                    >Registration</button>
                </div>
            </div>
           </div>
       </div>
   ) 
}

export default AuthPage