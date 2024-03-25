import React from 'react'
import S from './Messages.module.css'
import {MyDialogsContainer} from './myDialogs/MyDialogsContainer'
import {MyMessagesContainer} from './myMessages/MyMessagesContainer'


 export const Messages = () => {
    return (
        <section className={S.messages}>
            <MyDialogsContainer/>
            <MyMessagesContainer/>
        </section>
    )
}



