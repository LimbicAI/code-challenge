import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const noop = () => {};

const Button = ({
	children,
	disabled,
	onClick = noop,
	type = 'button',
	variation = 'default'
}) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.default]: variation === 'default',
				[styles.small]: variation === 'small',
				[styles.alert]: variation === 'alert',
				[styles.disabled]: disabled
			})}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	variation: PropTypes.oneOf(['default', 'small', 'alert'])
};

export default Button;
