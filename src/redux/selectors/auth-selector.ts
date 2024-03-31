import {AppRootState} from '../redux-store'
import {LogInType} from '../reducers/auth-reducer'

// ---- Селекторы для страницы logIn ------
export const getLogInObjS = (state: AppRootState):LogInType => {
    return state.auth.logIn
}

export const getIsAuthS = (state: AppRootState):boolean => {
    return state.auth.isAuth
}

export const getIsServerErrorS = (state: AppRootState):string => {
    return state.auth.isServerError
}

export const getCaptchaUrlFromStateS= (state: AppRootState):string => {
    return state.auth.captchaUrl
}

// ---- Селекторы для страницы Header ------
export const getLogInS = (state: AppRootState):string => {
    return state.auth.login
}

export const getEmailS = (state: AppRootState):string => {
    return state.auth.email
}

export const getIdS = (state: AppRootState):number | null => {
    return state.auth.id
}