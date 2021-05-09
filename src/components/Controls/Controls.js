import React from 'react';
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import styles from './styles.module.css';

const Controls = props => {
	return (
		<>
			<Link
				to="/questions"
				className={clsx(styles.link, {
					[styles.disabled]: props.location.pathname === '/questions'
				})}
			>
				Questions
			</Link>
			<Link
				to="/clients"
				className={clsx(styles.link, {
					[styles.disabled]: props.location.pathname === '/clients'
				})}
			>
				Clients
			</Link>
		</>
	);
};

export default withRouter(Controls);
