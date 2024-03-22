// Типизация
export type UsersAPIComponentPropsType = ''
/*
type UsersAPIComponentMapStateToProps = ReturnType<typeof mapStateToProps>

type UsersAPIComponentMapDispatchToProps = {
    getUsers: (currentPage: number, pageSize: number, filter: UsersFilterType) => void
    unFollow: (id: number) => void
    follow: (id: number) => void
}


class UsersAPIComponent extends React.PureComponent<UsersAPIComponentPropsType> {

    //  -------- Первая загрузка списка пользователей ----------------
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, {term: '', friends: null})
    }

    //  -------- Изменение текущей страницы ----------------
    onPageChanged = (currentPage: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }

    // ----- Изменение списка пагинации при переключении -------
    onPagination = () => {
        const {totalCount, pageSize, currentPage} = this.props
        return onPaginationHelper(totalCount, pageSize, currentPage)
    }

    // ----- Изменили filter и запросили новых пользователей -------
    onFilterChanged = (filter: UsersFilterType) => {
        const {pageSize} = this.props
        this.props.getUsers(1, pageSize, filter)
    }

    render() {
        const {pagStart, pagCenter, pagEnd} = this.onPagination()

        return (
            <>
                {this.props.isFetching
                    ? <Preloader isFetching={this.props.isFetching}/>
                    : <Users
                        onPageChanged={this.onPageChanged}
                        pagStart={pagStart}
                        pagCenter={pagCenter}
                        pagEnd={pagEnd}
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
        totalCount: getTotalCountS(state),
        pageSize: getPageSizeS(state),
        currentPage: getCurrentPageS(state),
        isFetching: getIsFetchingS(state),
        filter: getUsersFilterS(state)
    }
}

export const UsersContainer = compose<React.ComponentType>(
    // withAuthRedirect,
    connect(mapStateToProps,
        {getUsers, follow, unFollow}
    ))(UsersAPIComponent)

 */
