import {FriendsSideBar} from './FriendsSideBar'
import {connect} from 'react-redux'
import {AppRootState} from '../../../../../redux/redux-store'
import {friendsSuperSelector} from '../../../../../redux/selectors/friendlist-selector'
import React from 'react'
import {compose} from 'redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {getStatus, goToPage} from '../../../../../redux/reducers/profile-reducer'
import {getCurrentPageS, getPageSizeS} from '../../../../../redux/selectors/users-selectors'
import {getUsers, UsersFilterType} from '../../../../../redux/reducers/users-reducer'


export type FriendsSideBarAPIComponentPropsType =
    FriendsSideBarAPIComponentMapDispatchToProps &
    FriendsSideBarAPIComponentMapStateToProps &
    RouteComponentProps<{ userId: string }>

type FriendsSideBarAPIComponentMapStateToProps = ReturnType<typeof mapStateToProps>

type FriendsSideBarAPIComponentMapDispatchToProps = {
    goToPage: (id: string) => void
    getUsers: (currentPage: number, pageSize: number, filter: UsersFilterType) => void
    getStatus: (id: number) => void
}

class FriendsSideBarAPIComponent extends React.PureComponent<FriendsSideBarAPIComponentPropsType> {

    //  -------- Загрузка страницы пользователя при клике на ссылку ----------------
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, {term: '', friends: true})
    }

    //  -------- Загрузка страницы пользователя при клике на ссылку ----------------
    componentDidUpdate() {
        this.props.goToPage(this.props.match.params.userId)
        this.props.getStatus(+this.props.match.params.userId)
    }


    render() {
        return (
            <FriendsSideBar friendsSuperList={this.props.friendsSuperList}/>
        )
    }
}

const mapStateToProps = (state: AppRootState) => {
    return {
        // friendsList: state.friendsListData,
        friendsSuperList: friendsSuperSelector(state),
        pageSize: getPageSizeS(state),
        currentPage: getCurrentPageS(state)
    }
}

export const FriendsSideBarContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {goToPage, getUsers, getStatus}))
(FriendsSideBarAPIComponent)

