import React from 'react'
import {connect} from 'react-redux'
import {AppRootState} from '../../../../redux/redux-store'
import {Inputs, LogIn} from './LogIn'
import {serverLogIn} from '../../../../redux/reducers/auth-reducer'
import {getCaptchaUrlFromState, getIsAuth, getIsServerError, getLogInObj} from '../../../../redux/selectors/auth-selector'

export type LogInAPIComponentPropsType =
    LogInAPIComponentMapStateToProps &
    LogInAPIComponentMapDispatchToProps

type LogInAPIComponentMapStateToProps = ReturnType<typeof mapStateToProps>
type LogInAPIComponentMapDispatchToProps = {
    serverLogIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


class LogInAPIComponent extends React.PureComponent<LogInAPIComponentPropsType> {


    //  -------- Первая авторизация ----------------
    onSubmitForm = (data: Inputs) => {
        this.props.serverLogIn(data.LogIn, data.Password, data.Remember, data.captchaUrl)

    }

    render() {
        return (
            <LogIn
                onSubmitForm={this.onSubmitForm}
                logIn={this.props.logIn}
                isAuth={this.props.isAuth}
                isServerError={this.props.isServerError}
                captchaUrl={this.props.captchaUrl}
            />
        )
    }
}

const mapStateToProps = (state: AppRootState) => {
    return {
        logIn: getLogInObj(state),
        isAuth: getIsAuth(state),
        isServerError: getIsServerError(state),
        captchaUrl: getCaptchaUrlFromState(state)
    }
}

export const LogInContainer =
    connect(mapStateToProps, {serverLogIn}
    )(LogInAPIComponent)
