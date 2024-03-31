import {AuthPageInitialState, authReducer, setAuthUserData} from '../reducers/auth-reducer'
import {ChatMessagesType, ChatPageInitialState, ChatStatusType} from '../reducers/chat-reducer'

let startState: ChatPageInitialState

beforeEach(() => {
    startState = {
        messages: [] as ChatMessagesType[],
        status: 'pending' as ChatStatusType
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
