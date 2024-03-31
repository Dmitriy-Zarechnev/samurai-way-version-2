import React from 'react'
import {AppRootState} from '../redux/redux-store'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getIsAuthS} from '../redux/selectors/auth-selector'


const mapStateToPropsForRedirect = (state: AppRootState) => {
    return {
        isAuth: getIsAuthS(state)
    }
}
type mapStateToPropsForRedirectPropsType = ReturnType<typeof mapStateToPropsForRedirect>


// ---- HOC - используется чтобы добавить свойство redirect
export const withAuthRedirect = (Component: React.ComponentType<any>) => {
    class RedirectComponent extends React.PureComponent<mapStateToPropsForRedirectPropsType> {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}

