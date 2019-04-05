import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Jokes(props) {
  const [jokes, setJokes] = useState();


  useEffect(
    () => {
      const token = localStorage.getItem('token')
      const jokeGrab = async () => {
        let theJokes = await axios.get('http://localhost:7777/api/jokes', { headers: {
          Authorization: `${token}`
        }});
        setJokes(theJokes.data);
      };
      jokeGrab()
    },
    []
  );

  return (
    <code>
      <pre>
        {JSON.stringify(jokes, null, 2)}
      </pre>
    </code>);
}

export default Jokes;