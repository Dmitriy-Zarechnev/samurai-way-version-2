import {applyMiddleware, combineReducers, createStore} from 'redux'
import {profileReducer} from './reducers/profile-reducer'
import {messagesReducer} from './reducers/messages-reducer'
import {friendslistReducer} from './reducers/friendslist-reducer'
import {usersReducer} from './reducers/users-reducer'
import {authReducer} from './reducers/auth-reducer'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './reducers/app-reducer'
import {chatReducer} from './reducers/chat-reducer'

// rootReducer для всего приложения
const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    friendsListData: friendslistReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat:chatReducer
})

// Типизация всего STATE
export type AppRootState = ReturnType<typeof rootReducer>

// STORE приложения
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

// @ts-ignore
window.store = store