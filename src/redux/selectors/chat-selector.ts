import {AppRootState} from '../redux-store'
import {ChatMessagesType, ChatStatusType} from '../reducers/chat-reducer'

export const chatMessagesS = (state: AppRootState): ChatMessagesType[] => {
    return state.chat.messages
}
export const chatStatusS = (state: AppRootState): ChatStatusType => {
    return state.chat.status
}