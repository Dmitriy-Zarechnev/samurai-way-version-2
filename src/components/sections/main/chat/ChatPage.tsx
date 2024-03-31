import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {startChatMessagesListening, stopChatMessagesListening} from '../../../../redux/reducers/chat-reducer'
import {chatStatusS} from '../../../../redux/selectors/chat-selector'
import {useAppDispatch} from '../../../../redux/types/Types'
import {ChatMessages} from './ChatMessages/ChatMessages'
import {ChatAddMessageForm} from './chatAddMessage/ChatAddMessageForm'
import S from './ChatPage.module.css'


export const ChatPage = () => {
    // Используем хук useSelector и получаем данные из state
    const status = useSelector(chatStatusS)

    //  Используем хук useAppDispatch и получаем dispatch
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Начало открытия канала после монтирования компоненты
        dispatch(startChatMessagesListening())

        return () => {
            // Закрытие канала перед размонтированием компоненты
            dispatch(stopChatMessagesListening())
        }
    }, [])

    return (
        <div className={S.wrapper}>
            {status === 'error' && <div className={S.error}>Some Error Occurred! Please Refresh Page</div>}
            <ChatMessages/>
            <ChatAddMessageForm/>
        </div>
    )
}





