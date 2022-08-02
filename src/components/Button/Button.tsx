import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';


export interface Props extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    theme: 'primary' | 'secondary' | 'plain' | 'default',
    size: 'sm' | 'md' | 'lg' | 'xl',
    loading?: boolean,
    disabled?: boolean,
    type?: 'button' | 'submit',
    wide?: boolean;
    onClick?(): void,
}

const Button = ({
    children, theme, disabled = false, size = 'md', loading = false, type, wide, onClick
}: Props) => {
    return (
        <button onClick={onClick} disabled={disabled}>

        </button>
    )
}

