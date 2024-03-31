import {AppRootState} from '../redux-store'
import {LogInType} from '../reducers/auth-reducer'

// ---- Селекторы для страницы logIn ------
export const getLogInObj = (state: AppRootState):LogInType => {
    return state.auth.logIn
}

export const getIsAuth = (state: AppRootState):boolean => {
    return state.auth.isAuth
}

export const getIsServerError = (state: AppRootState):string => {
    return state.auth.isServerError
}

export const getCaptchaUrlFromState= (state: AppRootState):string => {
    return state.auth.captchaUrl
}

// ---- Селекторы для страницы Header ------
export const getLogIn = (state: AppRootState):string => {
    return state.auth.login
}

export const getEmail = (state: AppRootState):string => {
    return state.auth.email
}

export const getId = (state: AppRootState):number | null => {
    return state.auth.id
}