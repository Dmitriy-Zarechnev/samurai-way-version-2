import {AppRootState} from '../redux-store'

// ---- Селекторы для страницы logIn ------
export const getLogInObj = (state: AppRootState) => {
    return state.auth.logIn
}

export const getIsAuth = (state: AppRootState) => {
    return state.auth.isAuth
}

export const getIsServerError = (state: AppRootState) => {
    return state.auth.isServerError
}

export const getCaptchaUrlFromState= (state: AppRootState) => {
    return state.auth.captchaUrl
}

// ---- Селекторы для страницы Header ------
export const getLogIn = (state: AppRootState) => {
    return state.auth.login
}

export const getEmail = (state: AppRootState) => {
    return state.auth.email
}

export const getId = (state: AppRootState) => {
    return state.auth.id
}