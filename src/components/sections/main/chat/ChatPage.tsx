import React, {memo, useEffect, useState} from 'react'


// WebSocket соединение
const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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


    return (
        <div>
            <ChatMessages/>
            <ChatAddMessageForm/>
        </div>
    )
}


export const ChatMessages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            setMessages(JSON.parse(e.data))
        })
    }, [])

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
    return (
        <div>
            <textarea></textarea>
            <button>Send</button>
        </div>
    )
}

