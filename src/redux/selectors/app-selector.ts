import {AppRootState} from '../redux-store'

export const getInitializedS = (state: AppRootState):boolean => {
    return state.app.initialized
}