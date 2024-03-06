import {AppRootState} from '../redux-store'

export const getInitialized = (state: AppRootState) => {
    return state.app.initialized
}