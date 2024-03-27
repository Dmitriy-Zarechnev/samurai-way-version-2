// WebSocket Message Response Type
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

// Типизация подписчика
type SubscriberType = (messages: ChatMessageType[]) => void

// Массив подписчиков
let subscribers: SubscriberType[] = []

// -------------------- Управление WebSocket -----------------------
// Объявили WebSocket соединение
let ws: WebSocket

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
    subscribers.forEach(el => el(newMessages))
}

// Функция для добавления WebSocket соединения
function createChannel() {
    // Отписались от старого события перед новой подпиской
    ws?.removeEventListener('close', closeEvent)
    // Принудительно закрыли WebSocket соединение перед новой подпиской
    ws?.close()


    // Инициализация нового WebSocket соединения
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    // Подписка на событие потери соединения
    ws.addEventListener('close', closeEvent)
}

// ---------------------------------------------------------------

export const chatAPI = {
    // Подписка на изменение сообщений
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        // Отписка в стиле Redux
        return () => {
            subscribers = subscribers.filter(el => el !== callback)
        }
    },

    // Отписка от сообщений в стиле pussy
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(el => el !== callback)
    }
}