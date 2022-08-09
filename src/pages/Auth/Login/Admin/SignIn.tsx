import React from 'react';
import AdminLogin from 'containers/onboarding/Login/AdminLogin';

import styles from '../../auth.module.scss'

const SignIn = () => {
    return (
        <div className={styles.login}>
            <h1>Welcome Admin</h1>
            <AdminLogin />
        </div>
    )
}

export default SignIn;
