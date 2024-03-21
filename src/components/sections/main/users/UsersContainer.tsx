import React from 'react'
import {connect} from 'react-redux'
import {follow, getUsers, newPageGetUsers, unFollow, UsersFilterType} from '../../../../redux/reducers/users-reducer'
import {Users} from './Users'
import {Preloader} from '../../../common/preloader/Preloader'
import {AppRootState} from '../../../../redux/redux-store'
import {compose} from 'redux'
import {getCurrentPageS, getUsersFilterS, getIsFetchingS, getIsFollowingInProgressS, getPageSizeS, getTotalCountS, getUsersS} from '../../../../redux/selectors/users-selectors'
import {onPaginationHelper} from '../../../../utils/pagination-helper'


// Типизация
type UsersAPIComponentPropsType =
    UsersAPIComponentMapStateToProps &
    UsersAPIComponentMapDispatchToProps

type UsersAPIComponentMapStateToProps = ReturnType<typeof mapStateToProps>

type UsersAPIComponentMapDispatchToProps = {
    getUsers: (currentPage: number, pageSize: number, filter: UsersFilterType) => void
    newPageGetUsers: (currentPage: number, pageSize: number, filter: UsersFilterType) => void
    unFollow: (id: number) => void
    follow: (id: number) => void
}


class UsersAPIComponent extends React.PureComponent<UsersAPIComponentPropsType> {

    //  -------- Первая загрузка списка пользователей ----------------
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter)
    }

    //  -------- Изменение текущей страницы ----------------
    onPageChanged = (currentPage: number) => {
        const {pageSize, filter} = this.props
        this.props.newPageGetUsers(currentPage, pageSize, filter)
    }

    // ----- Изменение списка пагинации при переключении -------
    onPagination = () => {
        const {totalCount, pageSize, currentPage} = this.props
        return onPaginationHelper(totalCount, pageSize, currentPage)
    }

    // ----- Изменили filter и запросили новых пользователей -------
    onFilterChanged = (filter: UsersFilterType) => {
        const {pageSize} = this.props
        this.props.newPageGetUsers(1, pageSize, filter)
    }

    render() {
        const {pagStart, pagCenter, pagEnd} = this.onPagination()

        return (
            <>
                {this.props.isFetching
                    ? <Preloader isFetching={this.props.isFetching}/>
                    : <Users
                        items={this.props.items}
                        totalCount={this.props.totalCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        pagStart={pagStart}
                        pagCenter={pagCenter}
                        pagEnd={pagEnd}
                        followingInProgress={this.props.followingInProgress}
                        follow={this.props.follow}
                        unFollow={this.props.unFollow}
                        onFilterChanged={this.onFilterChanged}
                    />
                }
            </>
        )
    }
}

const mapStateToProps = (state: AppRootState) => {
    return {
        items: getUsersS(state),
        totalCount: getTotalCountS(state),
        pageSize: getPageSizeS(state),
        currentPage: getCurrentPageS(state),
        isFetching: getIsFetchingS(state),
        followingInProgress: getIsFollowingInProgressS(state),
        filter: getUsersFilterS(state)
    }
}

export const UsersContainer = compose<React.ComponentType>(
    // withAuthRedirect,
    connect(mapStateToProps,
        {getUsers, newPageGetUsers, follow, unFollow}
    ))(UsersAPIComponent)
