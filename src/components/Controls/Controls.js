import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import styles from './styles.module.scss';

const noop = () => {};

const Controls = ({ location, onClick = noop }) => {
	return (
		<div className={styles.controls}>
			<Link
				to="/questions"
				className={clsx(styles.link, {
					[styles.disabled]: location.pathname === '/questions'
				})}
			>
				Questions
			</Link>
			<Link
				to="/clients"
				className={clsx(styles.link, {
					[styles.disabled]: location.pathname === '/clients'
				})}
			>
				Clients
			</Link>
			<button
				className={clsx(styles.link, styles.button)}
				onClick={onClick}
			>
				Log Out
			</button>
		</div>
	);
};

Controls.propTypes = {
	location: PropTypes.object,
	onClick: PropTypes.func
};

export default withRouter(Controls);
