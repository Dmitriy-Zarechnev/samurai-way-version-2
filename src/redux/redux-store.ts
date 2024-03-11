import {applyMiddleware, combineReducers, createStore} from 'redux'
import {profileReducer} from './reducers/profile-reducer'
import {messagesReducer} from './reducers/messages-reducer'
import {friendslistReducer} from './reducers/friendslist-reducer'
import {usersReducer} from './reducers/users-reducer'
import {authReducer} from './reducers/auth-reducer'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './reducers/app-reducer'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    friendsListData: friendslistReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

// Типизация всего STATE
export type AppRootState = ReturnType<typeof rootReducer>


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store