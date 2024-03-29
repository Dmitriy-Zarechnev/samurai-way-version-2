import {AppRootState} from '../redux-store'
import {ChatMessagesType, ChatStatusType} from '../reducers/chat-reducer'

export const chatMessagesSelector = (state: AppRootState): ChatMessagesType[] => {
    return state.chat.messages
}
export const chatStatusSelector = (state: AppRootState): ChatStatusType => {
    return state.chat.status
}