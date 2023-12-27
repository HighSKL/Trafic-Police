'use client'
import React from 'react';
import style from './authpage.module.scss';
import { Formik, Form, Field, FormikValues } from 'formik';
import { validatorAuth } from '@/app/modules/validator';
import { useRouter } from 'next/navigation';
import { authUser } from '@/app/modules/apiservice';
import withOutOfAuth from '@/app/modules/Auth/withOutOfAuth';

function AuthPage() {

    enum FieldErrors {
        emailError,
        passwordError,
        invalidPasswordError,
        userNotFoundError
    }

    enum StatusCodes {
        UserAuthorized = 200, UserNotFound = 401, InvalidPassword = 403
    }

    const [fieldError, setFieldError] = React.useState<FieldErrors | null>(null)
    const [isSignInDisabled, setIsSignInDisabled] = React.useState(false)
    const router = useRouter()

    const trySendRequest = async (values: FormikValues) => {
        if (
            validatorAuth(/^\S+@\S+\.\S+$/, FieldErrors.emailError, values.email, setFieldError) &&
            validatorAuth(/\w/, FieldErrors.passwordError, values.password, setFieldError)
        ) {
            setFieldError(null);
            setIsSignInDisabled(true)
            await authUser(values.email, values.password).then((res)=>{
                switch(res.status){
                    case StatusCodes.UserAuthorized:{
                        router.push('/home')
                        break
                    }
                    case StatusCodes.UserNotFound:{
                        setFieldError(FieldErrors.userNotFoundError)
                        break
                    }
                    case StatusCodes.InvalidPassword:{
                        setFieldError(FieldErrors.invalidPasswordError)
                        break
                    }
                }
                setIsSignInDisabled(false)
            })

        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.form_window}>
                <div className={style.form_container}>
                    <h1 className={style.title}>Авторизация</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={async (values) => await trySendRequest(values)}
                    >
                        {() => (
                            <Form className={style.from_container} id={style.form}>
                                <div className={style.email_block}>
                                    <p>Почта</p>
                                    <Field name="email" type="email" className={style.email_field} />
                                    {fieldError == FieldErrors.emailError && <p className={style.error_text}>Введите действительный email</p>}
                                    {fieldError == FieldErrors.userNotFoundError && <p className={style.error_text}>Пользователь с таким email не найден</p>}
                                </div>
                                <div className={style.password_block}>
                                    <p>Пароль</p>
                                    <Field name="password" type="password" className={style.password_field} />
                                    {fieldError == FieldErrors.passwordError && <p className={style.error_text} id={style.pas}>Введите пароль</p>}
                                    {fieldError == FieldErrors.invalidPasswordError && <p className={style.error_text} id={style.pas}>Неверный пароль</p>}
                                </div>
                                <button className={style.button} disabled={isSignInDisabled}>Войти</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

// export default withOutOfAuth(AuthPage)
export default AuthPage