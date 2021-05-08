import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './context/AppState';
import Clients from './screens/Clients';
import Questions from './screens/Questions';
import styles from './App.module.css';

function App() {
	return (
		<div className={styles.app}>
			<header className={styles.appHeader}>
				<h2>Therapy Portal</h2>
			</header>
			<AppProvider>
				<Router>
					<Switch>
						<Route exact path="/questions" component={Questions} />
						<Route path="/clients" component={Clients} />
					</Switch>
				</Router>
			</AppProvider>
		</div>
	);
}

export default App;
