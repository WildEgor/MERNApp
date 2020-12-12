import {React, useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logOutHandler = e => {
        e.preventDefault()
        console.log(auth);
        auth.loginOut()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper blue darken-1">
            <span className="brand-logo">Links Reducer v0.1</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                    <NavLink to="/links">Links</NavLink>
                </li>
                <li>
                    <NavLink to="/create">Create</NavLink>
                </li>
                <li>
                    <a href="/" onClick = { logOutHandler }>Exit</a>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar