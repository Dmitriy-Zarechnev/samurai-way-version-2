import React, {ChangeEvent, memo, useEffect, useState} from 'react'
import {ChatMessageType} from '../../../../api/chat-api'
import {useDispatch, useSelector} from 'react-redux'
import {sendChatMessage, startChatMessagesListening, stopChatMessagesListening} from '../../../../redux/reducers/chat-reducer'
import {chatMessagesSelector, chatStatusSelector} from '../../../../redux/selectors/chat-selector'


export const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}


export const Chat = () => {
    // Локальный state для WebSocket соединения
    // const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    //  Используем хук useDispatch и получаем dispatch
    const dispatch = useDispatch()

    useEffect(() => {
        // Начало открытия канала после монтирования компоненты
        dispatch(startChatMessagesListening())

        return () => {
            // Закрытие канала перед размонтированием компоненты
            dispatch(stopChatMessagesListening())
        }
    }, [])

    // useEffect(() => {
    // Объявили WebSocket соединение
    //let ws: WebSocket
    //const closeEvent = () => {
    /* Рекурсивно вызвали себя же, чтоб создать соединение снова
    с определенным интервалом */
    //setTimeout(() => {
    //  createChannel()
    //}, 3000)
    //  }

    // Функция для добавления WebSocket соединения
    // function createChannel() {
    //     // Отписались от старого события перед новой подпиской
    //     ws?.removeEventListener('close', closeEvent)
    //     // Принудительно закрыли WebSocket соединение перед новой подпиской
    //     ws?.close()
    //
    //
    //     // Инициализация нового WebSocket соединения
    //     ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    //
    //     // Подписка на событие потери соединения
    //     ws.addEventListener('close', closeEvent)
    //
    //     // Заменили значение в локальном state
    //     setWsChannel(ws)
    // }

    // Вызвали функцию для добавления WebSocket соединения
    //createChannel()


    // return () => {
    //     // Отписались от событий перед уходом со страницы
    //     ws.removeEventListener('close', closeEvent)
    //
    //     // Принудительно закрыли WebSocket соединение
    //     ws.close()
    // }
    //}, [])


    return (
        <div>
            <ChatMessages/>
            <ChatAddMessageForm/>
        </div>
    )
}


export const ChatMessages = () => {
    // Локальный state для добавления сообщений с сервера
    // const [messages, setMessages] = useState<ChatMessageType[]>([])

    // Используем хук useSelector и получаем данные из state
    const messages = useSelector(chatMessagesSelector)
    /*
        useEffect(() => {
            // Функция для обработчика события
            const messageEvent = (e: MessageEvent) => {
                setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
            }

            // Подписались на новое | новые сообщение с сервера
            props.wsChannel?.addEventListener('message', messageEvent)

            // Удалили обработчик после ухода с компоненты
            return () => {
                props.wsChannel?.removeEventListener('message', messageEvent)
            }
        }, [props.wsChannel])

     */

    return (
        <div style={{height: '800px', overflowY: 'auto'}}>
            {messages.map((el, index) => {
                return <ChatMessage key={index} message={el}/>
            })}
        </div>
    )
}

export const ChatMessage = memo((props: { message: ChatMessageType }) => {

    return (
        <div>
            <div>
                <img style={{width: '30px', height: '30px'}}
                     src={props.message.photo}
                     alt={'message'}/>
                <div>
                    <span>{props.message.userName}</span>
                </div>
            </div>
            <p>{props.message.message}</p>
            <hr/>
        </div>
    )
})

export const ChatAddMessageForm = () => {
    // Локальный state для отправки своих сообщений
    const [message, setMessage] = useState<string>('')
    // Локальный state для статуса websocket канала
    // const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')


    // Используем хук useSelector и получаем данные из state
    const status = useSelector(chatStatusSelector)

    //  Используем хук useDispatch и получаем dispatch
    const dispatch = useDispatch()

    /*
        useEffect(() => {
            // Функция для обработчика
            const openEvent = () => {
                setReadyStatus('ready')
            }

            // Подписались на изменение состояния канала
            props.wsChannel?.addEventListener('open', openEvent)

            // Удалили обработчик после ухода с компоненты
            return () => {
                props.wsChannel?.removeEventListener('open', openEvent)
            }
        }, [props.wsChannel])
     */
    // ------ Функция для отправки сообщения -------
    const sendMessageHandler = () => {
        // Проверили наличие сообщения
        if (!message) {
            return
        }
        // Отправили сообщение через websocket канал
        dispatch(sendChatMessage(message))
        // Очистили state сообщения
        setMessage('')
    }


    // ------ Функция для textarea -------
    const textAreaOnChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    return (
        <div>
            <textarea onChange={textAreaOnChangeHandler}
                      value={message}/>
            <button disabled={status !== 'ready'}
                    onClick={sendMessageHandler}>
                Send
            </button>
        </div>
    )
}

