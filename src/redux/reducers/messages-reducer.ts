// Типизация
export type MessagesPagePropsType = typeof initialState

export type  MyMessagesActionsType = ReturnType<typeof sendNewMessage>


// *********** Константы названий экшенов ****************
const SEND_NEW_MESSAGE = '/messages/SEND-NEW-MESSAGE'


// *********** Первоначальный стэйт для messagesReducer ****************
const initialState = {
    messagesData: [
        {id: 1, message: 'hello there'},
        {id: 2, message: 'hi are you?'},
        {id: 3, message: 'We far from the shallow, now'},
        {id: 4, message: 'Are you happy in this world?'},
        {id: 5, message: 'Tell me something , boy'},
        {id: 6, message: 'I would rather not say'}
    ]
}

// *********** Reducer - редьюсер, чистая функция для изменения стэйта после получения экшена от диспача ****************
export const messagesReducer = (state = initialState, action: MyMessagesActionsType): MessagesPagePropsType => {

    switch (action.type) {
        case SEND_NEW_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, {
                    id: state.messagesData.length + 1,
                    message: action.payload.message
                }]
            }
        default:
            return state
    }
}


// *********** Action creators - экшн криэйторы создают объект action ****************
export const sendNewMessage = (message: string) => {
    return {type: SEND_NEW_MESSAGE, payload: {message}} as const
}


// *********** Thunk - санки необходимые для общения с DAL ****************