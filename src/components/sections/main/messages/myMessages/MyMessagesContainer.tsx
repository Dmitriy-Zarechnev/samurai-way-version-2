import React from 'react'
import {MyMessages} from './MyMessages'
import {connect} from 'react-redux'
import {sendNewMessage} from '../../../../../redux/reducers/messages-reducer'
import {AppRootState} from '../../../../../redux/redux-store'
import {withAuthRedirect} from '../../../../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {getMessageData} from '../../../../../redux/selectors/message-selector'


export type MyMessagesPropsType =
    MyMessagesMapStateToProps &
    MyMessagesMapDispatchToProps

type MyMessagesMapStateToProps = ReturnType<typeof mapStateToProps>

type MyMessagesMapDispatchToProps = {
    sendNewMessage: (message: string) => void
}


const mapStateToProps = (state: AppRootState) => {
    return {
        messagesData: getMessageData(state)
    }
}


export const MyMessagesContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {sendNewMessage})
)(MyMessages)


