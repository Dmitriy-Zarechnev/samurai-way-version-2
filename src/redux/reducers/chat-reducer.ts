import {chatAPI, ChatMessageType} from '../../api/chat-api'
import {ThunkDispatchType} from '../types/Types'


// Типизация Actions
export type ChatReducerActionsType =
    ReturnType<typeof chatMessagesReceived> |
    ReturnType<typeof chatStatusChanged>


// Типизация InitialState
type ChatPageInitialState = typeof chatInitialState

// Типизация Status
export type ChatStatusType = 'pending' | 'ready' | 'error'

// *********** Константы названий actions ****************
const CHAT_MESSAGES_RECEIVED = '/chat/CHAT-MESSAGES-RECEIVED'
const CHAT_STATUS_CHANGED = '/chat/CHAT-STATUS-CHANGED'


// *********** Первоначальный state для chatReducer ****************
const chatInitialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as ChatStatusType
}


// *********** Reducer - чистая функция для изменения state после получения action от dispatch ****************
export const chatReducer = (state: ChatPageInitialState = chatInitialState, action: ChatReducerActionsType): ChatPageInitialState => {
    switch (action.type) {
        case CHAT_MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages]
            }

        case CHAT_STATUS_CHANGED:
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}


// *********** Action creators - создают объект action ****************
export const chatMessagesReceived = (messages: ChatMessageType[]) => {
    return {type: CHAT_MESSAGES_RECEIVED, payload: {messages}} as const
}
export const chatStatusChanged = (status: ChatStatusType) => {
    return {type: CHAT_STATUS_CHANGED, payload: {status}} as const
}


// *********** Thunk - необходимые для общения с DAL ****************


// Создали универсальную приватную функцию для messages
let _newChatMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null
// Функция, которая позволяет менять или использовать _newChatMessagesHandler
const newChatMessagesHandler = (dispatch: ThunkDispatchType) => {
    // Если универсальная приватная функция не существует
    if (_newChatMessagesHandler === null) {
        // Мы её инициализируем и делаем dispatch
        _newChatMessagesHandler = (messages) => {
            dispatch(chatMessagesReceived(messages))
        }
    }
    return _newChatMessagesHandler
}

// Создали универсальную приватную функцию для status
let _chatStatusChangedHandler: ((status: ChatStatusType) => void) | null = null
// Функция, которая позволяет менять или использовать _chatStatusChangedHandler
const chatStatusHandlerCreator = (dispatch: ThunkDispatchType) => {
    // Если универсальная приватная функция не существует
    if (_chatStatusChangedHandler === null) {
        // Мы её инициализируем и делаем dispatch
        _chatStatusChangedHandler = (status) => {
            dispatch(chatStatusChanged(status))
        }
    }
    return _chatStatusChangedHandler
}




//  -------- Начинаем следить за изменением сообщений ----------------
export const startChatMessagesListening = () => async (dispatch: ThunkDispatchType) => {
    // Создали WebSocket соединение
    chatAPI.start()
    // Подписались на изменения чата
    chatAPI.subscribe('message-received', newChatMessagesHandler(dispatch))
    // Подписались на изменения статуса
    chatAPI.subscribe('status-changed', chatStatusHandlerCreator(dispatch))
}


//  -------- Прекращаем следить за изменением сообщений ----------------
export const stopChatMessagesListening = () => async (dispatch: ThunkDispatchType) => {
    // Отписались от изменений чата
    chatAPI.unsubscribe('message-received', newChatMessagesHandler(dispatch))
    // Отписались от изменения статуса
    chatAPI.unsubscribe('status-changed', chatStatusHandlerCreator(dispatch))
    // Удалили WebSocket соединение
    chatAPI.stop()
}

//  -------- Отправка сообщений в чат ----------------
export const sendChatMessage = (message: string) => async (dispatch: ThunkDispatchType) => {
    // Отправили сообщение
    chatAPI.sendChatMessage(message)
}