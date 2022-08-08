import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import { SignInSchema } from 'utils/validation';
import { authService } from 'services/auth';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import styles from '../onboarding.module.scss';

const LoginForm = () => {
    const navigate = useNavigate()

    const redirect = () => {
        navigate('/auth/admin-sign-in')
    }

    const handleSubmit = (values: any) => {
        authService.login(values).then((response) => {
            if (response.length === 0) {
                toast.error('user not found')
            } else {
                localStorage.setItem(`client`, JSON.stringify(response[0]));
                navigate('/client')
                toast.success('Success')

            }
        })

    }

    return (
        <div className={styles.mainform}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignInSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form>
                        <div>
                            <Input
                                type='email'
                                label='Email*'
                                placeholder='john@email.com'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                name='email'
                            />
                            {formik.errors.email ? <span className='error'>{formik.errors.email}</span> : null}
                        </div>
                        <div>
                            <Input
                                type='password'
                                label='Password*'
                                placeholder='********'
                                value={formik.values.password}
                                name='password'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password ? <span className='error'>{formik.errors.password}</span> : null}
                        </div>

                        <div>
                            <Button theme='primary' size='md' disabled={!formik.isValid || !formik.dirty}>
                                Continue
                            </Button>
                        </div>
                        <div className={styles.mainform__admin_btn}>
                            <Button type='button' size='sm' theme='secondary' onClick={() => redirect()}>
                                Signin as Admin
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm
