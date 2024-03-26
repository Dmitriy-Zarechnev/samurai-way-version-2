import React, {useCallback, useEffect} from 'react'
import S from './UsersPage.module.css'
import {Pagination} from '../../../common/pagination/Pagination'
import {getUsers, UsersFilterType} from '../../../../redux/reducers/users-reducer'
import {User} from './user/User'
import {UsersSearchForm} from './user/usersSearch/UsersSearchForm'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentPageS, getIsFetchingS, getPageSizeS, getTotalCountS, getUsersFilterS, getUsersS} from '../../../../redux/selectors/users-selectors'
import {onPaginationHelper} from '../../../../utils/pagination-helper'
import {Preloader} from '../../../common/preloader/Preloader'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'


export const UsersPage = () => {

    // Используем хук useSelector и получаем данные из state
    const items = useSelector(getUsersS)
    const currentPage = useSelector(getCurrentPageS)
    const pageSize = useSelector(getPageSizeS)
    const filter = useSelector(getUsersFilterS)
    const totalCount = useSelector(getTotalCountS)
    const isFetching = useSelector(getIsFetchingS)

    //  Используем хук useDispatch и получаем dispatch
    const dispatch = useDispatch()

    // Используем хук из react-router-dom
    const history = useHistory()

    // Синхронизируем URL адрес
    // useEffect(() => {
    //     history.push({
    //         pathname: '/users',
    //         search: `?term=${filter.term}&friend=${filter.friends}&page=${currentPage}`
    //     })
    //
    // }, [filter, currentPage])


    //  -------- Первая загрузка списка пользователей ----------------
    useEffect(() => {
        // Прочитали данные из URL
        const parsed = queryString.parse(history.location.search.substr(1))

        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])


    //  -------- Изменение текущей страницы ----------------
    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }


    // ----- Изменили filter и запросили новых пользователей -------
    const onFilterChanged = useCallback((filter: UsersFilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }, [pageSize, filter])


    // ----- Изменение списка пагинации при переключении -------
    const {pagStart, pagCenter, pagEnd} =
        onPaginationHelper(totalCount, pageSize, currentPage)


    return (
        isFetching
            ? <Preloader isFetching={isFetching}/>
            : <div className={S.users_lists}>
                <div className={S.users_lists__pagination}>
                    <Pagination
                        currentArray={pagStart}
                        onPageChanged={onPageChanged}
                        currentPage={currentPage}/>
                    {pagStart.length > 0 && <span className={S.users_lists__dotes}>... </span>}

                    <Pagination
                        currentArray={pagCenter}
                        onPageChanged={onPageChanged}
                        currentPage={currentPage}/>

                    {pagEnd.length > 0 && <span className={S.users_lists__dotes}>... </span>}
                    <Pagination
                        currentArray={pagEnd}
                        onPageChanged={onPageChanged}
                        currentPage={currentPage}/>
                </div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
                {items.map(el => <User key={el.id} user={el}/>)}
            </div>
    )
}
