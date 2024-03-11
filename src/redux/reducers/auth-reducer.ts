import {authAPI, securityAPI} from '../../api/api'
import {ThunkDispatchType, ThunkType} from '../types/Types'


// Типизация
export type AuthReducerActionsType =
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof logInServer> |
    ReturnType<typeof serverError> |
    ReturnType<typeof getCaptchaUrlSuccess>


export type AuthPageInitialState = {
    id: number | null
    email: string
    login: string
    isAuth: boolean
    isFetching: boolean
    logIn: LogInType
    isServerError: string
    captchaUrl: string
}

export type LogInType = {
    email: string,
    password: string,
    rememberMe: boolean
}


// *********** Константы названий экшенов ****************
const SET_AUTH_USER_DATA = '/auth/SET-AUTH-USER-DATA'
const LOG_IN_SERVER = '/auth/LOG-IN-SERVER'
const SERVER_ERROR = '/auth/SERVER-ERROR'
const GET_CAPTCHA_URL_SUCCESS = '/auth/GET-CAPTCHA-URL-SUCCESS'


// *********** Первоначальный стэйт для authReducer ****************
const initialState: AuthPageInitialState = {
    id: null,
    email: '',
    login: '',
    isAuth: false,
    isFetching: false,
    logIn: {
        email: '',
        password: '',
        rememberMe: false
    },
    isServerError: '',
    captchaUrl: ''
}


// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const authReducer = (state = initialState, action: AuthReducerActionsType): AuthPageInitialState => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        case LOG_IN_SERVER:
            return {
                ...state,
                logIn: {
                    ...state.logIn,
                    email: action.payload.logIn.email,
                    password: action.payload.logIn.password,
                    rememberMe: action.payload.logIn.rememberMe
                },
                isServerError: ''
            }

        case SERVER_ERROR:
            return {
                ...state,
                isServerError: action.payload.message
            }

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.payload.url
            }

        default:
            return state
    }
}


// *********** Action creators - экшн криэйторы создают объект action ****************
export const setAuthUserData = (id: number | null, email: string, login: string, isAuth: boolean) => {
    return {type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth}} as const
}
export const logInServer = (logIn: LogInType) => {
    return {type: LOG_IN_SERVER, payload: {logIn}} as const
}
export const serverError = (message: string) => {
    return {type: SERVER_ERROR, payload: {message}} as const
}
export const getCaptchaUrlSuccess = (url: string) => {
    return {type: GET_CAPTCHA_URL_SUCCESS, payload: {url}} as const
}

// *********** Thunk - санки необходимые для общения с DAL ****************
//  -------- Проверка авторизации на сервере ----------------
export const authMe = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await authAPI.authHeader()
    if (response.data.resultCode === 0) {

        // Прошла проверка на авторизацию и данные обновились
        dispatch(setAuthUserData(
            response.data.data.id,
            response.data.data.email,
            response.data.data.login,
            true
        ))
    }
}

//  -------- Логинизация на сервере ----------------
export const serverLogIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch: ThunkDispatchType) => {
        const response = await authAPI.logIn(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {

            // Успешная авторизация на сайте
            dispatch(authMe())
            rememberMe && dispatch(logInServer({email, password, rememberMe}))
        } else {
            if (response.data.resultCode === 10) {

                // Запросили captcha при коде 10
                dispatch(getCaptchaUrl())
            }

            // Неудачная авторизация на сайте
            dispatch(serverError(response.data.messages[0]))
        }
    }


//  -------- Вылогинизация на сервере ----------------
export const serverLogOut = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await authAPI.logOut()

    // Произошла успешная вылогинизация на сайте
    response.data.resultCode === 0 && dispatch(setAuthUserData(null, '', '', false))
}


//  -------- Запрос Captcha URL на сервере ----------------
export const getCaptchaUrl = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await securityAPI.getCaptchaUrl()

    // Получили URL с сервера и задиспатчили в state
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}