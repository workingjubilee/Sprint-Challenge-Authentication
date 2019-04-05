import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Jokes(props) {
  const [jokes, setJokes] = useState();


  useEffect(
    () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvcGUiLCJpYXQiOjE1NTQ0ODI3MTcsImV4cCI6MTU1NDU2OTExN30.pR3FdHzoM3z0PysxWnGqGEKyi4DduYOgMEZpYPrRlek";
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