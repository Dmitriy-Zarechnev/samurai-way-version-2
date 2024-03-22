import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import S from './LogInPage.module.css'
import {serverLogIn} from '../../../../redux/reducers/auth-reducer'
import {InputForm} from '../../../common/inputForm/InputForm'
import {Button} from '../../../common/button/Button'
import {Redirect} from 'react-router-dom'
import {CheckInputForm} from '../../../common/checkInputForm/CheckInputForm'
import {useDispatch, useSelector} from 'react-redux'
import {getCaptchaUrlFromState, getIsAuth, getIsServerError, getLogInObj} from '../../../../redux/selectors/auth-selector'


export type Inputs = {
    LogIn: string
    Password: string
    Remember: boolean
    captchaUrl: string
}


export const LogInPage = () => {
    // React-hook-form
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>()

    // Используем хук useSelector и получаем данные из state
    const logIn = useSelector(getLogInObj)
    const isAuth = useSelector(getIsAuth)
    const isServerError = useSelector(getIsServerError)
    const captchaUrl = useSelector(getCaptchaUrlFromState)

    //  Используем хук useDispatch и получаем dispatch
    const dispatch = useDispatch()


    // Данные из форм после submit
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(serverLogIn(data.LogIn, data.Password, data.Remember, data.captchaUrl))
    }


    // Redirect на страницу профиля, при успешной авторизации
    if (isAuth) return <Redirect to={'/profile'}/>

    return (
        <>
            <h2 className={S.header}>YOUR PARADISE BEGINS HERE</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={S.formWrapper}>

                <InputForm value={'LogIn'}
                           errors={errors.LogIn}
                           register={register}
                           type={'email'}
                           defValue={logIn.email}
                />

                <InputForm value={'Password'}
                           errors={errors.Password}
                           register={register}
                           type={'password'}
                           defValue={logIn.password}
                />

                <CheckInputForm id={'Remember'}
                                name={'Remember Me'}
                                value={'Remember'}
                                register={register}
                                devChecked={logIn.rememberMe}
                                addBoxClass={S.checkBoxAdd}/>

                {captchaUrl && <img src={captchaUrl} alt={'CaptchaPicture'}/>}
                {captchaUrl && <InputForm
                    type={'text'}
                    errors={errors.captchaUrl}
                    value={'captchaUrl'}
                    register={register}
                    defValue={''}/>
                }

                <Button name={'Sing In'}/>
                {isServerError && <p className={S.errorText}>{isServerError}</p>}
            </form>
        </>
    )
}

