import React, {ChangeEvent, memo, UIEvent, useEffect, useRef, useState} from 'react'
import {ChatMessageAPIType} from '../../../../api/chat-api'
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

    // Используем хук useSelector и получаем данные из state
    const status = useSelector(chatStatusSelector)

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

    return (
        <div>
            {status === 'error' && <div>Some Error Occurred! Please Refresh Page</div>}
            <ChatMessages/>
            <ChatAddMessageForm/>
        </div>
    )
}


export const ChatMessages = () => {

    // Используем хук useSelector и получаем данные из state
    const messages = useSelector(chatMessagesSelector)

    // Обратились напрямую к div элементу, чтоб сделать scroll
    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    // Локальный state для управления AutoScroll
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) {
            // Scroll будет внизу всегда
            messagesAnchorRef.current?.scrollIntoView()
        }
    }, [messages])


    // ------ Функция для обработки scroll -------
    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        let element = e.currentTarget
        // Скроллим нашу страницу
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            // Дошли до конца и включили autoScroll
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            // Отошли и отключили autoScroll
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return (
        <div style={{height: '800px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map(el => {
                return <ChatMessage key={el.id} message={el}/>
            })}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}



export const ChatMessage = memo((props: { message: ChatMessageAPIType }) => {

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
    const [message, setMessage] = useState('')

    // Используем хук useSelector и получаем данные из state
    const status = useSelector(chatStatusSelector)

    //  Используем хук useDispatch и получаем dispatch
    const dispatch = useDispatch()


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

