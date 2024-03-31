import {ChatStatusType} from '../redux/reducers/chat-reducer'


// WebSocket Message Response Type
export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

// Типизация подписчика для 'message-received'
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void

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
const closeEventHandler = () => {
    // Уведомляем подписчиков 'status-changed' об изменении статуса
    notifySubscribesAboutStatus('pending')
    /* Рекурсивно вызвали себя же, чтоб создать соединение снова
    с определенным интервалом */
    setTimeout(createChannel, 3000)
}

// Функция для обработчика события 'message'
const messageEventHandler = (e: MessageEvent) => {
    // Разпарсили ответ от сервера
    const newMessages = JSON.parse(e.data)
    // Добавили ребят с сервера
    subscribers['message-received'].forEach(el => el(newMessages))
}

// Функция для обработчика события 'open'
const openEventHandler = () => {
    notifySubscribesAboutStatus('ready')
}

// Функция для обработчика события 'error'
const errorEventHandler = () => {
    notifySubscribesAboutStatus('error')
    console.error('REFRESH PAGE')
}

// Функция зачистки / отписки от событий
const cleanUp = () => {
    // Отписались от старого события перед новой подпиской
    ws?.removeEventListener('close', closeEventHandler)
    // Отписка от события 'message'
    ws?.removeEventListener('message', messageEventHandler)
    // Отписка от события 'open'
    ws?.removeEventListener('open', openEventHandler)
    // Отписка от события 'error'
    ws?.removeEventListener('error', errorEventHandler)
}

// Уведомляем подписчиков 'status-changed' об изменении статуса
const notifySubscribesAboutStatus = (status: ChatStatusType) => {
    subscribers['status-changed'].forEach(el => el(status))
}


// ------ Функция для добавления WebSocket соединения ------
function createChannel() {
    cleanUp()
    // Принудительно закрыли WebSocket соединение перед новой подпиской
    ws?.close()


    // Инициализация нового WebSocket соединения
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    // Уведомляем подписчиков 'status-changed' об изменении статуса
    notifySubscribesAboutStatus('pending')

    // Подписка на событие потери соединения
    ws.addEventListener('close', closeEventHandler)
    // Подписка на событие 'message'
    ws.addEventListener('message', messageEventHandler)
    // Подписка на событие 'open'
    ws.addEventListener('open', openEventHandler)
    // Подписка на событие 'error'
    ws.addEventListener('error', errorEventHandler)
}


// ---------------------------------------------------------------

export const chatAPI = {
    // Подписка на изменение сообщений
    subscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        // Отписка в стиле Redux
        // return () => {
        //     // @ts-ignore
        //     subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
        // }
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