import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import S from './LogIn.module.css'
import {LogInType} from '../../../../redux/reducers/auth-reducer'
import {InputForm} from '../../../common/inputForm/InputForm'
import {Button} from '../../../common/button/Button'
import {Redirect} from 'react-router-dom'
import {CheckInputForm} from '../../../common/checkInputForm/CheckInputForm'


export type Inputs = {
    LogIn: string
    Password: string
    Remember: boolean
    captchaUrl: string
}

type LogInPropsType = {
    onSubmitForm: (data: Inputs) => void
    logIn: LogInType
    isAuth: boolean
    isServerError: string
    captchaUrl: string
}


export const LogIn = React.memo((props: LogInPropsType) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        props.onSubmitForm(data)
    }

    // Redirect на страницу профиля, при успешной авторизации
    if (props.isAuth) return <Redirect to={'/profile'}/>

    return (
        <>
            <h2 className={S.header}>YOUR PARADISE BEGINS HERE</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={S.formWrapper}>

                <InputForm value={'LogIn'}
                           errors={errors.LogIn}
                           register={register}
                           type={'email'}
                           defValue={props.logIn.email}
                />

                <InputForm value={'Password'}
                           errors={errors.Password}
                           register={register}
                           type={'password'}
                           defValue={props.logIn.password}
                />

                <CheckInputForm id={'Remember'}
                                name={'Remember Me'}
                                value={'Remember'}
                                register={register}
                                devChecked={props.logIn.rememberMe}
                                addBoxClass={S.checkBoxAdd}/>

                {props.captchaUrl && <img src={props.captchaUrl} alt={'CaptchaPicture'}/>}
                {props.captchaUrl && <InputForm
                    type={'text'}
                    errors={errors.captchaUrl}
                    value={'captchaUrl'}
                    register={register}
                    defValue={''}/>
                }

                <Button name={'Sing In'}/>
                {props.isServerError && <p className={S.errorText}>{props.isServerError}</p>}
            </form>
        </>
    )
})

