import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from './context/AppState';
import Controls from './components/Controls';
import Clients from './screens/Clients';
import Questions from './screens/Questions';
import styles from './App.module.scss';

const App = () => {
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
					<Controls />
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
						<Route exact path="/questions" component={Questions} />
						<Route exact path="/clients" component={Clients} />
					</Switch>
				</Router>
			</AppProvider>
		</div>
	);
};

export default App;
