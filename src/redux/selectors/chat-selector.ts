import {AppRootState} from '../redux-store'
import {ChatMessageType} from '../../api/chat-api'

export const chatMessagesSelector = (state: AppRootState): ChatMessageType[] => {
    return state.chat.messages
}