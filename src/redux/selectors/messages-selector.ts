import {AppRootState} from '../redux-store'

export const getMessageData = (state: AppRootState) => {
    return state.messagesPage.messagesData
}