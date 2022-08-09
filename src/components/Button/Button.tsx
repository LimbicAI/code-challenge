import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';
import Loader from '../Loader';


export interface Props extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    theme: 'primary' | 'secondary' | 'plain' | 'default',
    size: 'sm' | 'md' | 'lg' | 'xl',
    loading?: boolean,
    disabled?: boolean,
    type?: 'button' | 'submit',
    wide?: boolean;
    variant?: string;
    onClick?:(ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
    children, theme, disabled, size, loading, type, wide, onClick, variant,
}: Props) => {
    return (
        <button onClick={onClick} disabled={disabled} className={classnames(styles.btn, styles[`btn__${theme}`], styles[`btn__${variant}`], wide && styles.wide, styles[`btn__${size}`])
        } type={type}>

            {loading ? <Loader/> : children}


        </button>
    )
}

export default Button;



