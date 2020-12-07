import React from 'react';
import Home from './Components/Home'
import Navbar from './Components/Navbar';
import Authorize from './Components/PreAuth/Authorize';
import Admin from './Components/AuthComponents/Admin';
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';

export default class App extends React.Component{
	constructor(props){
		super(props)

		this.setRole = this.setRole.bind(this);
		this.adminView = this.adminView.bind(this);
		this.protectedViews = this.protectedViews.bind(this);
		this.clearToken = this.clearToken.bind(this);
		this.updateToken = this.updateToken.bind(this);

		this.state = {
			userRole: '',
			sessionToken: ''
		}

	}

	componentDidMount(){
		if(localStorage.getItem('token')){this.setState({sessionToken: localStorage.getItem('token')})}
	}

	updateToken(newToken){
		localStorage.setItem('token', newToken);
		this.setState({sessionToken: newToken});
	}

	clearToken(){
		localStorage.clear();
		this.setState({sessionToken: ''});
	}

	protectedViews(){
		return (this.state.sessionToken === localStorage.getItem('token')
		? <Home token={this.state.sessionToken} />
		: <Authorize setRole={this.setRole} updateToken={this.updateToken} />)
	}


	adminView(){
		return (this.state.userRole === "Admin"
		? <Admin token={this.state.sessionToken} />
		: null)
	}

	setRole(role){
		this.setState({
			userRole: role
		});
	}
	
	render(){
		return(
			<BrowserRouter>
				<Navbar clickLogout={this.clearToken} token={this.state.sessionToken} role={this.state.userRole} setRole={this.setRole}/>
				<Switch>
					<Route exact path="/" component={this.protectedViews} />
					<Route exact path="/admin" component={this.adminView} />
				</Switch>
			</BrowserRouter>
		)
	}
}

// function App() {

// 	const [sessionToken, setSessionToken] = useState('');
// 	const [ userRole, setUserRole ] = useState('');

	// useEffect(() => {
	// 	if(localStorage.getItem('token')){                              // if local storage has a token,
	// 	setSessionToken(localStorage.getItem('token'));           // set the variable, setSessionToken to localstorage.getItem('token')
	// 	}
	// }, [])

	// const updateToken = (newToken) => {
	// 	localStorage.setItem('token', newToken);
	// 	setSessionToken(newToken);
	// }

	// const clearToken = () => {
	// 	localStorage.clear();
	// 	setSessionToken('');
	// }

	// const protectedViews = () => {
	// 	return (sessionToken === localStorage.getItem('token')
	// 	? <Home token={sessionToken} />
	// 	: <Authorize setRole={setRole} updateToken={updateToken} />)
	// }

	// const adminView = () => {
	// 	return (userRole === "Admin"
	// 	? <Admin token={sessionToken} />
	// 	: null)
	// }

	// const setRole = (role) => {
	// 	setUserRole(role);
	// }

	// return (
	// 	<BrowserRouter>
	// 		<Navbar clickLogout={clearToken} token={sessionToken} role={userRole} setRole={setRole}/>
	// 		<Switch>
	// 			<Route exact path="/" component={protectedViews} />
	// 			<Route exact path="/details" component={SleepDetails} />
	// 			<Route exact path="/admin" component={adminView} />
	// 		</Switch>
	// 	</BrowserRouter>
// 	// );
// }

// export default App;