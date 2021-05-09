import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const noop = () => {};

const Button = ({ children, disabled, onClick = noop, type = 'default' }) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.default]: type === 'default',
				[styles.small]: type === 'small',
				[styles.alert]: type === 'alert',
				[styles.disabled]: disabled
			})}
			disabled={disabled}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['default', 'small', 'alert'])
};

export default Button;
