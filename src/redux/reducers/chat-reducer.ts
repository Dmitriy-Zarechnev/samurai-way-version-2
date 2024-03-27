import {chatAPI, ChatMessageType} from '../../api/chat-api'
import {ThunkDispatchType} from '../types/Types'


// Типизация Actions
export type ChatReducerActionsType =
    ReturnType<typeof chatMessagesReceived>


// Типизация InitialState
type ChatPageInitialState = typeof chatInitialState


// *********** Константы названий actions ****************
const CHAT_MESSAGES_RECEIVED = '/chat/CHAT-MESSAGES-RECEIVED'


// *********** Первоначальный state для chatReducer ****************
const chatInitialState = {
    messages: [] as ChatMessageType[]
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
        default:
            return state
    }
}


// *********** Action creators - создают объект action ****************
export const chatMessagesReceived = (messages: ChatMessageType[]) => {
    return {type: CHAT_MESSAGES_RECEIVED, payload: {messages}} as const
}


// *********** Thunk - необходимые для общения с DAL ****************


// Создали универсальную приватную функцию
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

//  -------- Начинаем следить за изменением сообщений ----------------
export const startChatMessagesListening = () => async (dispatch: ThunkDispatchType) => {
    // Создали WebSocket соединение
    chatAPI.start()
    // Подписались на изменения чата
    chatAPI.subscribe(newChatMessagesHandler(dispatch))
}


//  -------- Прекращаем следить за изменением сообщений ----------------
export const stopChatMessagesListening = () => async (dispatch: ThunkDispatchType) => {
    // Отписались от изменений чата
    chatAPI.unsubscribe(newChatMessagesHandler(dispatch))
    // Удалили WebSocket соединение
    chatAPI.stop()
}

//  -------- Отправка сообщений в чат ----------------
export const sendChatMessage = (message: string) => async (dispatch: ThunkDispatchType) => {
    // Отправили сообщение
    chatAPI.sendChatMessage(message)
}