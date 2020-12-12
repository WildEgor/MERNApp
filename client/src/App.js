import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/Navbar';
import 'materialize-css'

function App() {
  const {login, loginOut, token, userId} = useAuth()
  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, login, loginOut, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <NavBar/> }
        <div className="container">
            { routes }
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
