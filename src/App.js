import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './context/AppState';
import Controls from './components/Controls';
import SignInModal from './components/SignInModal';
import Questionnaire from './components/Questionnaire';
import Clients from './screens/Clients';
import Questions from './screens/Questions';
import styles from './App.module.scss';

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLogin = type => event => {
		event.preventDefault();
		setLoggedIn(type);
	};

	const logout = () => {
		setLoggedIn(false);
	};

	return (
		<div className={styles.app}>
			<header className={styles.appHeader}>
				<h2>
					<a className={styles.headerTitle} href="/">
						Therapy Portal
					</a>
				</h2>
			</header>
			<AppProvider>
				<Router>
					{loggedIn === 'therapist' && <Controls onClick={logout} />}
					<Switch>
						<Route
							exact
							path="/"
							component={() => (
								<h3 className={styles.intro}>
									Select an Option above and get Started!
								</h3>
							)}
						/>
						{loggedIn === 'therapist' && (
							<>
								<Route
									exact
									path="/questions"
									component={Questions}
								/>
								<Route
									exact
									path="/clients"
									component={Clients}
								/>
							</>
						)}
					</Switch>
					{!loggedIn && <SignInModal onSelect={handleLogin} />}
					{loggedIn === 'patient' && <Questionnaire />}
				</Router>
			</AppProvider>
		</div>
	);
};

export default App;
