import {MessagesPagePropsType, messagesReducer, sendNewMessage} from '../redux/reducers/messages-reducer'

let startState: MessagesPagePropsType

beforeEach(() => {
    startState = {
        messagesData: [
            {id: 1, message: 'hello there'},
            {id: 2, message: 'hi are you?'},
            {id: 3, message: 'We far from the shallow, now'},
            {id: 4, message: 'Are you happy in this world?'},
            {id: 5, message: 'Tell me something , boy'},
            {id: 6, message: 'I would rather not say'}
        ]
    }
})


test('messages reducer should increase the messagesData length by one', () => {

    const newMessage = 'hello'

    const newState = messagesReducer(startState, sendNewMessage(newMessage))

    expect(newState.messagesData.length).toBe(startState.messagesData.length + 1)
    expect(newState.messagesData[6].message).toBe('hello')
})
