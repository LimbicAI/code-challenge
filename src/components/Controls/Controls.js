import React from 'react';
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import styles from './styles.module.scss';

const Controls = props => {
	return (
		<div className={styles.controls}>
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
		</div>
	);
};

export default withRouter(Controls);
