'use client'
import React from 'react';
import style from './authpage.module.scss';
import { Formik, Form, Field, FormikValues } from 'formik';
import { validator } from '@/app/modules/validator';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authUser } from '@/app/modules/apiservice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';

export default function AuthPage() {

    enum FieldErrors {
        emailError,
        passwordError,
        invalidPasswordError,
        userNotFoundError
    }

    const [fieldError, setFieldError] = React.useState<FieldErrors | null>(null)
    const [isSignInDisabled, setIsSignInDisabled] = React.useState(false)
    const errors = useSelector((state:RootState)=>state.errors.Login)
    const router = useRouter()

    const trySendRequest = async (values: FormikValues) => {
        if (
            validator(/^\S+@\S+\.\S+$/, FieldErrors.emailError, values.email, setFieldError) &&
            validator(/\w/, FieldErrors.passwordError, values.password, setFieldError)
        ) {
            setFieldError(null);
            setIsSignInDisabled(true)
            await authUser(values.email, values.password).then((res)=>{
                switch(res.status){
                    case 200:{
                        router.push('/home')
                        break
                    }
                    case 401:{
                        setFieldError(FieldErrors.userNotFoundError)
                        break
                    }
                    case 403:{
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