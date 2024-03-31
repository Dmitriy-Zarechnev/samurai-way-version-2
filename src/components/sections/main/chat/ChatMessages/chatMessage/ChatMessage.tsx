import React, {memo} from 'react'
import {ChatMessageAPIType} from '../../../../../../api/chat-api'

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