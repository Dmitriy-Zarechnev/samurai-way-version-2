import React from 'react'

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

    const messages: Array<any> = [1, 2, 3, 4]

    return (
        <div>
            {messages.map(el => {
                return <ChatMessage message={el}/>
            })}
        </div>
    )
}

export const ChatMessage = (props: { message: string }) => {

    const message = {
        url: 'https://thumbs.dreamstime.com/b/%D1%83-%D0%B8%D1%82%D0%BA%D0%B0-%D0%BD%D0%B0%D1%80%D0%B8%D1%81%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F-%D1%80%D1%83%D0%BA%D0%BE%D0%B9-%D0%BC%D0%B8-%D0%B0%D1%8F-%D0%BC%D0%B0-%D0%B5%D0%BD%D1%8C%D0%BA%D0%B0%D1%8F-69658352.jpg',
        name: 'Sam',
        text: 'Hello Chat'
    }
    return (
        <div>
            <img src={message.url} alt={'message'}/>
            <span>{message.name}</span>
            <p>{message.text}</p>
            <hr/>
        </div>
    )
}

export const ChatAddMessageForm = () => {
    return (
        <div>
            <textarea></textarea>
            <button>Send</button>
        </div>
    )
}

