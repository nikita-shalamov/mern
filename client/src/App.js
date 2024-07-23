
import 'materialize-css/dist/css/materialize.min.css';
import useRoutes from './routes';
import useAuth from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';
import Loader from './components/Loader';


function App() {
	const {token, login, logout, userId, ready} = useAuth()
	const isAuthenticated = !!token
	console.log(localStorage.getItem('userData'));
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader/>
	}

	return (
		<AuthContext.Provider value={{
			token, login, logout, userId, isAuthenticated
		}}>
			{isAuthenticated && <NavBar/>}
			<div className="container">
				{routes}
			</div>
		</AuthContext.Provider>
		
	);
}

export default App;
