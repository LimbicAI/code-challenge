import React, { ChangeEvent, HTMLAttributes,  useState } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'

export interface Props extends HTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password' | 'data' | 'radio' | 'number' | 'email'
    placeholder?: string
    name?: string
    readonly?: boolean
    value?: string
    label?: string
    width?: string
    className?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onFocus?(): (value: string) => void
    onBlur?(): (value: string) => void
}

export const Input = ({
    type = 'text',
    placeholder,
    name,
    readonly,
    value,
    label,
    width,
    onChange,
    onFocus,
    onBlur,
}: Props) => {
    const [inputType, setInputType] = useState<string>(type)

    return (
        <label className={(styles.input__label, styles[`${type}`])} htmlFor='id'>
            <span className={styles.input__label}>
                {label}
            </span>

            <input
                type={inputType}
                placeholder={placeholder}
                name={name}
                readOnly={readonly}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                width={width}
                className={classnames(styles.input)}
            />

            <button
                type='button'
                aria-label='Show password'
                onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                className={styles.input__btn}

            >
                {type === 'password' && (
                    <svg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        {inputType === 'password' ? (
                            <path
                                d='m11.62 14.238-2.328-1.825A2.249 2.249 0 0 0 11.5 14.25c.041 0 .08-.01.12-.012Zm-.119 1.137H11.5A3.376 3.376 0 0 1 8.125 12c0-.159.025-.311.047-.464L5.905 9.759a9.355 9.355 0 0 0-1.074 1.842 1.204 1.204 0 0 0-.081.4c0 .116.037.294.081.398C6.103 15.292 8.62 17.25 11.5 17.25c1.066 0 2.08-.27 3.002-.753l-1.747-1.369c-.388.156-.81.247-1.254.247Zm7.284 1.62-2.43-1.905a9.01 9.01 0 0 0 1.814-2.69c.044-.105.08-.284.08-.4 0-.117-.036-.295-.08-.399-1.272-2.893-3.788-4.85-6.669-4.85-1.47 0-2.841.513-4.004 1.396L4.91 6.12a.562.562 0 0 0-.695.885L18.09 17.88a.562.562 0 1 0 .695-.885ZM14.875 12c0 .583-.157 1.124-.42 1.6l-.904-.709c.123-.273.199-.572.199-.892a2.25 2.25 0 0 0-2.25-2.25h-.005c-.054 0-.126.01-.193.018.122.217.198.465.198.732 0 .239-.06.46-.16.66L9.243 9.515a3.322 3.322 0 0 1 2.257-.89A3.376 3.376 0 0 1 14.875 12v.002Z'
                                fill='#363740'
                            />
                        ) : (
                            <path
                                d='M18.419 11.6c-1.272-2.892-3.788-4.85-6.669-4.85S6.352 8.709 5.081 11.6A1.204 1.204 0 0 0 5 12c0 .117.037.295.081.399 1.272 2.893 3.788 4.851 6.669 4.851s5.398-1.959 6.669-4.851c.044-.104.081-.283.081-.399 0-.117-.037-.295-.081-.4Zm-3.294.402a3.375 3.375 0 0 1-3.373 3.373h-.002a3.376 3.376 0 0 1 0-6.75A3.376 3.376 0 0 1 15.125 12v.002ZM11.75 9.75h-.005c-.054 0-.126.01-.193.018.122.217.198.465.198.732a1.5 1.5 0 0 1-1.5 1.5c-.268 0-.517-.076-.735-.2-.006.07-.015.144-.015.2a2.25 2.25 0 1 0 2.25-2.25Z'
                                fill='#363740'
                            />
                        )}
                    </svg>
                )}
            </button>
        </label>
    )
}

export default Input
