import {useSelector} from 'react-redux'
import {chatMessagesS} from '../../../../../redux/selectors/chat-selector'
import React, {UIEvent, useEffect, useRef, useState} from 'react'
import {ChatMessage} from './chatMessage/ChatMessage'
import S from './ChatMessages.module.css'


export const ChatMessages = () => {
    // Используем хук useSelector и получаем данные из state
    const messages = useSelector(chatMessagesS)

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
        <div className={S.messages_wrapper} onScroll={scrollHandler}>
            {messages.map(el => {
                return <ChatMessage key={el.id} message={el}/>
            })}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}