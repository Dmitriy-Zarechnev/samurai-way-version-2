import React, {memo, useEffect, useState} from 'react'


// Response Type
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}


export const Chat = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    // // WebSocket соединение
    // let wsChannel: WebSocket

    useEffect(() => {
        // Объявили WebSocket соединение
        let ws: WebSocket

        const closeEvent = () => {
            // Рекурсивно вызвали себя же, чтоб создать соединение снова
            // с определенным интервалом
            setTimeout(() => {
                createChannel()
            }, 3000)
        }

        // Функция для добавления WebSocket соединения
        function createChannel() {
            // Отписались от старого события перед новой подпиской
            ws?.removeEventListener('close', closeEvent)
            // Принудительно закрыли WebSocket соединение
            ws?.close()


            // Инициализация WebSocket
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

            // Подписка на потерю соединения
            ws.addEventListener('close', closeEvent)

            // Заменили значение в state
            setWsChannel(ws)
        }


        createChannel()


        return () => {
            // Отписались от событий перед уходом со страницы
            ws.removeEventListener('close', closeEvent)

            // Принудительно закрыли WebSocket соединение
            ws.close()
        }
    }, [])


    return (
        <div>
            <ChatMessages wsChannel={wsChannel}/>
            <ChatAddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}


export const ChatMessages = (props: { wsChannel: WebSocket | null }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])


    useEffect(() => {
        // Функция для обработчика
        const messageEvent = (e: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        }

        // Подписались на новое сообщение
        props.wsChannel?.addEventListener('message', messageEvent)

        // Удалили обработчик после ухода с компоненты
        return () => {
            props.wsChannel?.removeEventListener('message', messageEvent)
        }
    }, [props.wsChannel])

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

export const ChatAddMessageForm = (props: { wsChannel: WebSocket | null }) => {
    const [message, setMessage] = useState<string>('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

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

    const sendMessage = () => {
        if (!message) {
            return
        }
        props.wsChannel?.send(message)
        setMessage('')
    }


    return (
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            <button disabled={props.wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
        </div>
    )
}

