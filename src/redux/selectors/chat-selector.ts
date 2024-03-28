import {AppRootState} from '../redux-store'
import {ChatMessageType} from '../../api/chat-api'
import {ChatStatusType} from '../reducers/chat-reducer'

export const chatMessagesSelector = (state: AppRootState): ChatMessageType[] => {
    return state.chat.messages
}
export const chatStatusSelector = (state: AppRootState): ChatStatusType => {
    return state.chat.status
}