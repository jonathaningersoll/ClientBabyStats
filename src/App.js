import React, {
	useState,
	useEffect
} from 'react';
import Home from './Components/Home'
import Navbar from './Components/Navbar';
import Authorize from './Components/PreAuth/Authorize';
import SleepDetails from './Components/AuthComponents/Sleep/SleepDetails';
import {
	BrowserRouter,
	Switch,                       // Determines the different routes in my application
	Route,                        // 
	Link,                          // Link triggers a state change in the BrowserRouter which causes the Route to change what's in the view
} from 'react-router-dom';

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
		<BrowserRouter>
			<Navbar clickLogout={clearToken} token={sessionToken} />
			<Switch>
				<Route exact path="/" component={protectedViews} />
				<Route path="/FoodDetails" component={<FoodDetails />} />
				
				{/* 
					<Route path="/DiaperDetails" component={DiaperDetails} />
					<Route path="/GrowthDetails" component={GrowthDetails} />
					<Route path="/ChildDetails" component={ChildDetails} />
					<Route path="/Admin" component={Admin
				*/}
			</Switch>
		</BrowserRouter>
	);
}

export default App;