import React from 'react'
import S from './Message.module.css'

type MessagePropsType = {
    messagesData: Array<MessagesDataType>
}

export type MessagesDataType = {
    id: number
    message: string
}

export const Message = React.memo((props: MessagePropsType) => {
        return (
            <ul className={S.message_list}>
                {props.messagesData.map((el) => {
                    return <li key={el.id} className={S.message_list__item}>{el.message}</li>
                })}
            </ul>
        )
    }
)



