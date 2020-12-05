import React, {
	useState,
	useEffect
} from 'react';
import Home from './Components/Home'
import Navbar from './Components/Navbar';
import Authorize from './Components/PreAuth/Authorize';
import SleepDetails from './Components/AuthComponents/Sleep/SleepDetails';
import Admin from './Components/AuthComponents/Admin';
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';

function App() {

	const [sessionToken, setSessionToken] = useState('');
	const [ userRole, setUserRole ] = useState('');

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
		return (sessionToken === localStorage.getItem('token')
		? <Home token={sessionToken} />
		: <Authorize setRole={setRole} updateToken={updateToken} />)
	}

	const adminView = () => {
		return (userRole === "Admin"
		? <Admin token={sessionToken} />
		: null)
	}

	const setRole = (role) => {
		setUserRole(role);
	}

	return (
		<BrowserRouter>
			<Navbar clickLogout={clearToken} token={sessionToken} role={userRole} setRole={setRole}/>
			<Switch>
				<Route exact path="/" component={protectedViews} />
				<Route exact path="/details" component={SleepDetails} />
				<Route exact path="/admin" component={adminView} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;