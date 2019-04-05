import React, { useState } from 'react';
import axios from 'axios';

function Login({ history, ...moduloProps}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUser, setNewUser] = useState(false);

  return (
  <form onSubmit={submitUser}>
      <div><label>Username: <input type="text" value={username} name="username" onChange={event => setUsername(event.target.value)} /></label></div>
      <div><label>Password: <input type="password" value={password} name="password" onChange={event => setPassword(event.target.value)} /></label></div>
      <div><label>New User?<input type="checkbox" value={newUser} onChange={event => setNewUser(!newUser)} /></label></div>
      <button type="submit">Login</button>
  </form>);

  async function submitUser(event) {
    event.preventDefault();
    const user = { username, password };

    const route = newUser ? 'register' : 'login'

    let thePost = await axios.post(`http://localhost:7777/api/${route}`, user);

    if (thePost.data.token) {
      localStorage.setItem('token', thePost.data.token);
      history.push('/jokes');
    }
  }
}

export default Login