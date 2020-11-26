import React, { useState, useEffect } from 'react';
import Home from './Components/Home'
import Navbar from './Components/Navbar';
import Authorize from './Components/PreAuth/Authorize';

function App() {
  
  const [sessionToken, setSessionToken] = useState('');
     
    useEffect(() => {
        if(localStorage.getItem('token')){                              // if local storage has a token,
			setSessionToken(localStorage.getItem('token'));           // set the variable, setSessionToken to localstorage.getItem('token')
        }
    }, [])

	const updateToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setSessionToken(newToken);
    }

    const clearToken = () => {
		localStorage.clear();
		setSessionToken('');
    }

    const protectedViews = () => {
      return (sessionToken === localStorage.getItem('token') ? <Home token={sessionToken} />
	  // else, run the unauthorized stuff
      : <Authorize updateToken={updateToken} />)
    }

  return (
    <div>
      <Navbar clickLogout={clearToken} token={sessionToken} />
      {protectedViews()}
    </div>
  );
}

export default App;