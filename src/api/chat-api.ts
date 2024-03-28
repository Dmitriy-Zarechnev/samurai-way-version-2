// WebSocket Message Response Type
import {ChatStatusType} from '../redux/reducers/chat-reducer'

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

// Типизация подписчика для 'message-received'
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void

// Типизация подписчика для 'status-changed'
type StatusChangedSubscriberType = (status: ChatStatusType) => void

// Типизация событий
export type EventsNameType = 'message-received' | 'status-changed'

// Типизация subscribers
type SubscribersType = {
    'message-received': MessagesReceivedSubscriberType[],
    'status-changed': StatusChangedSubscriberType[]
}

// Массив подписчиков
let subscribers: SubscribersType = {
    'message-received': [],
    'status-changed': []
}

// -------------------- Управление WebSocket -----------------------
// Объявили WebSocket соединение
let ws: WebSocket | null = null

// Функция для обработчика события
const closeEvent = () => {
    /* Рекурсивно вызвали себя же, чтоб создать соединение снова
    с определенным интервалом */
    setTimeout(() => {
        createChannel()
    }, 3000)
}

// Функция для обработчика события 'message'
const messageEventHandler = (e: MessageEvent) => {
    // Разпарсили ответ от сервера
    const newMessages = JSON.parse(e.data)
    // Добавили ребят с сервера
    subscribers['message-received'].forEach(el => el(newMessages))
}

// Функция зачистки / отписки от событий
const cleanUp = () => {
    // Отписались от старого события перед новой подпиской
    ws?.removeEventListener('close', closeEvent)
    // Отписка от события 'message'
    ws?.removeEventListener('message', messageEventHandler)
}

// ------ Функция для добавления WebSocket соединения ------
function createChannel() {
    cleanUp()
    // Принудительно закрыли WebSocket соединение перед новой подпиской
    ws?.close()


    // Инициализация нового WebSocket соединения
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    // Подписка на событие потери соединения
    ws.addEventListener('close', closeEvent)
    // Подписка на событие 'message'
    ws.addEventListener('message', messageEventHandler)
}


// ---------------------------------------------------------------

export const chatAPI = {
    // Подписка на изменение сообщений
    subscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        // Отписка в стиле Redux
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
        }
    },

    // Отписка от сообщений в стиле pussy
    unsubscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
    },

    // Отправка сообщения
    sendChatMessage(message: string) {
        ws?.send(message)
    },

    // Добавили WebSocket соединение
    start() {
        createChannel()
    },

    // Удалили WebSocket соединение
    stop() {
        // Перезатерли всех подписчиков
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        // Принудительно закрыли WebSocket соединение перед новой подпиской
        ws?.close()
    }
}