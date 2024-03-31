import React, {memo} from 'react'
import {ChatMessageAPIType} from '../../../../../../api/chat-api'
import S from './ChatMessage.module.css'
import imgAlt from '../../../../../../assets/images/FriendDefault.webp'

export const ChatMessage = memo((props: { message: ChatMessageAPIType }) => {

    return (
        <div className={S.wrapper}>
            <div className={S.item_box}>
                <span className={S.item_text}>{props.message.userName}</span>
                <img className={S.item__img}
                     src={props.message.photo ? props.message.photo : imgAlt}
                     alt={`${props.message.userName} - photo`}/>
            </div>
            <p className={S.message}>{props.message.message}</p>
        </div>
    )
})