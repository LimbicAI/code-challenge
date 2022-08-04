import * as yup from 'yup';

const pattern =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,30}$/;

export const SignInSchema = yup.object().shape({
    email: yup.string().email().trim().required('email is required*'),
    password: yup
        .string()
        .required('password is required*')
        .min(8, 'Can not be less than eight characters')
        .max(30, 'Too Long')
        .matches(
            pattern, 'Must be mixed with special characters'
        ).trim()
});


export const InviteUserSchema = yup.object().shape({
    email: yup.string().email().trim().required('email is required*'),
    first_name: yup.string().required('First name is required*'),
    last_name: yup.string().required('Last name is required*'),
});
