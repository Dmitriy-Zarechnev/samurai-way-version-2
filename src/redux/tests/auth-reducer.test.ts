import {AuthPageInitialState, authReducer, getCaptchaUrlSuccess, logInServer, serverError, setAuthUserData} from '../reducers/auth-reducer'

let startState: AuthPageInitialState

beforeEach(() => {
    startState = {
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
})


test('auth reducer should return newData', () => {

    const newData = {
        id: 5,
        email: 'hello@gmail.com',
        login: 'Ori',
        isAuth: true
    }

    const newState = authReducer(startState, setAuthUserData(newData.id, newData.email, newData.login, newData.isAuth))

    expect(newState.isAuth).toBe(true)
    expect(newState.id).toBe(5)
    expect(newState.email).toBe('hello@gmail.com')
    expect(newState.login).toBe('Ori')
})


test('auth reducer should check your loginisation', () => {

    const newLogIn = {
        email: 'blabla@.com',
        password: 'HeyHey',
        rememberMe: true
    }

    const newState = authReducer(startState, logInServer(newLogIn))

    expect(newState.logIn.rememberMe).toBe(true)
    expect(newState.logIn.password).toBe(newLogIn.password)
    expect(newState.logIn.email).toBe('blabla@.com')
    expect(newState.isServerError).toBe('')
})


test('Server Error should be here', () => {

    const newMessage = 'Error Detected'

    const newState = authReducer(startState, serverError(newMessage))

    expect(newState.isServerError).toBe(newMessage)
})


test('Captcha Url should be here', () => {

    const newUrl = 'https//: Hello World'

    const newState = authReducer(startState, getCaptchaUrlSuccess(newUrl))

    expect(newState.captchaUrl).toBe(newUrl)
})