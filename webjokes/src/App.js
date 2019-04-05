import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Login from './Login.js';
import Jokes from './Jokes.js';

function App(props){
  return (
    <>
      <header>
        <NavLink to="/">Nowhere</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/jokes">Jokes</NavLink>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <Route exact path="/" component={Nowhere} />
        <Route path="/login" component={Login} />
        <Route path="/jokes" component={Jokes} />
      </main>
    </>
  );

  function logout() {
    localStorage.removeItem('token');
  };
}

function Nowhere(props) {
  return <h1>...</h1>;
}

export default App;