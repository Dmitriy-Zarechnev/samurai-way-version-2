import {chatMessagesReceived, ChatPageInitialState, chatReducer, chatStatusChanged} from '../reducers/chat-reducer'

let startState: ChatPageInitialState

beforeEach(() => {
    startState = {
        messages: [],
        status: 'pending'
    }
})


test('message should be changed', () => {

    const newData = [
        {
            message: 'hello',
            photo: 'url',
            userId: 2,
            userName: 'Bob'
        },
        {
            message: 'buy',
            photo: 'url2',
            userId: 5,
            userName: 'Sam'
        }
    ]

    const newState = chatReducer(startState, chatMessagesReceived(newData))

    expect(newState.messages[0].message).toBe(newData[0].message)
    expect(newState.messages[1].userName).toBe(newData[1].userName)
})


test('status should be changed', () => {

    const newData = 'ready'

    const newState = chatReducer(startState, chatStatusChanged(newData))

    expect(newState.status).toBe(newData)
})
