import React from 'react'
import {Header} from './Header'
import {connect} from 'react-redux'
import {serverLogOut} from '../../../redux/reducers/auth-reducer'
import {AppRootState} from '../../../redux/redux-store'
import {getEmailS, getIdS, getIsAuthS, getLogInS} from '../../../redux/selectors/auth-selector'

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
        id: getIdS(state),
        email: getEmailS(state),
        login: getLogInS(state),
        isAuth: getIsAuthS(state)
    }
}

export const HeaderContainer = connect(mapStateToProps, {serverLogOut})(HeaderAPIContainer)


