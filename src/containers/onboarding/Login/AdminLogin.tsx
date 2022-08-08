import React from 'react'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import styles from '../onboarding.module.scss'

const LoginForm = () => {
    return (
        <div className={styles.mainform}>
            <form>
                <div>
                    <Input type='email' label="Email*" placeholder="john@email.com" />
                </div>
                <div>
                    <Input type='password' label="Password*" placeholder='********' />
                </div>

                <div>
                    <Button theme='primary' size='md'>
                        Continue
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
