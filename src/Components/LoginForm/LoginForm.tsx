import React, {ChangeEvent} from 'react';
import {FormikErrors, useFormik} from 'formik';
import Input from '../Input/Input';
import {Button} from '../Button/Button';

import style from './LoginForm.module.scss'

export interface FormValues {
    clientId: number,
    email: string,
    password: string,
}

interface LoginFormProps {
    callback: (value: FormValues) => void
}

const validate = (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};

    if (!values.clientId) {
        errors.clientId = 'Required';
    } else if (values.clientId.toString().length === 0) {
        errors.clientId = 'Must be 1 characters or more';
    } else if (values.clientId.toString().length > 5) {
        errors.clientId = 'Must be 10 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 4) {
        errors.password = 'Must be 4 characters or more';
    } else if (values.password.length > 10) {
        errors.password = 'Must be 10 characters or less';
    }

    return errors;
}

export const LoginForm: React.FC<LoginFormProps> = React.memo(({callback}) => {

    const formik = useFormik({
        initialValues: {
            clientId: 1,
            email: 'user@ozitag.com',
            // email: '',
            password: 'user',
            // password: '',
        },
        validate,
        onSubmit: (values, {setSubmitting}) => {
            callback(values)
            setSubmitting(false)
        },
    });

    const containerInput = (id: string, inputLabelName: string, inputLabel: string, name: string,
                            type: string, className: string,
                            error: string | undefined, onChange: (e: ChangeEvent) => void,
                            value: number | string, placeholder?: string) => {
        return <Input id={id}
                      name={name}
                      type={type}
                      className={className}
                      error={error}
                      onChange={onChange}
                      value={value}
                      placeholder={placeholder}
                      inputLabelName={inputLabelName}
                      inputLabel={inputLabel}
        />
    }

    return (
        <div className={style.formWrapper}>
            <div className={style.headline}>
                <h1 className={style.headlineText}>WELCOME TO TAG</h1>
            </div>
            <div className={style.form}>
                <p className={style.formDescription}>Sign in to TAG</p>
                <form onSubmit={formik.handleSubmit}>
                    {containerInput('clientId', 'clientId', 'Enter ID', 'clientId', 'text',
                        style.input, formik.errors.clientId, formik.handleChange, formik.values.clientId, 'Example: "1"')}

                    {containerInput('email', 'email', 'Enter Email', 'email', 'text',
                        style.input, formik.errors.email, formik.handleChange, formik.values.email, 'Example: "user@ozitag.com"')}

                    {containerInput('password', 'password', 'Enter Password', 'password', 'text',
                        style.input, formik.errors.password, formik.handleChange, formik.values.password, 'Example: "user"')}

                    <div className={style.formBtnWrapper}>
                        <Button type="submit" className={style.formBtn}>Log in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
})





