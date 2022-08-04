import React from 'react'


import LoginForm from 'containers/onboarding/Login/LoginForm'
import styles from '../../auth.module.scss'


const Signin = () => {
    return (
        <div className={styles.login}>
            <h1>Start your therapy session</h1>
            <LoginForm />

        </div>
    )
}

export default Signin