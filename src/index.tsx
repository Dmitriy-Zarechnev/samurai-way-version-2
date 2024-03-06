import './index.css'
import ReactDOM from 'react-dom'
import store from './redux/redux-store'
import React from 'react'
import {Provider} from 'react-redux'
import {AppConnect} from './App'
import {HashRouter} from 'react-router-dom'


ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <AppConnect/>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
)

// Provider - записывает store в контекст
// HashRouter - знеобходим для работы router-dom




