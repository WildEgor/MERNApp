import { createContext } from 'react'

function noob(){}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noob,
    logOut: noob,
    isAuthenticated: false
})