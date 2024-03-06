import React from 'react'
import {Header} from './Header'
import {connect} from 'react-redux'
import {serverLogOut} from '../../../redux/reducers/auth-reducer'
import {AppRootState} from '../../../redux/redux-store'
import {getEmail, getId, getIsAuth, getLogIn} from '../../../redux/selectors/auth-selector'

// Типизация
type HeaderAPIContainerPropsType =
    HeaderAPIComponentMapStateToProps &
    HeaderAPIComponentMapDispatchToProps

type HeaderAPIComponentMapStateToProps = ReturnType<typeof mapStateToProps>
type HeaderAPIComponentMapDispatchToProps = {
    serverLogOut: () => void
}

class HeaderAPIContainer extends React.PureComponent<HeaderAPIContainerPropsType> {

    render() {
        return (
            <Header
                logOut={this.props.serverLogOut}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = (state: AppRootState) => {
    return {
        id: getId(state),
        email: getEmail(state),
        login: getLogIn(state),
        isAuth: getIsAuth(state)
    }
}

export const HeaderContainer = connect(mapStateToProps, {serverLogOut})(HeaderAPIContainer)


