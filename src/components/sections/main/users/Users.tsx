import React from 'react'
import S from './Users.module.css'
import {Pagination} from '../../../common/pagination/Pagination'
import {UsersListType} from '../../../../redux/reducers/users-reducer'
import {User} from './user/User'


type UsersPropsType = {
    items: UsersListType[]
    totalCount: number
    pageSize: number
    currentPage: number
    pagStart: number[]
    pagCenter: number[]
    pagEnd: number[]
    followingInProgress: number[]
    onPageChanged: (currentPage: number) => void
    unFollow: (id: number) => void
    follow: (id: number) => void
}

export const Users = React.memo((props: UsersPropsType) => {

    return (
        <div className={S.users_lists}>
            <div className={S.users_lists__pagination}>
                <Pagination
                    currentArray={props.pagStart}
                    onPageChanged={props.onPageChanged}
                    currentPage={props.currentPage}/>
                {props.pagStart.length > 0 && <span className={S.users_lists__dotes}>... </span>}

                <Pagination
                    currentArray={props.pagCenter}
                    onPageChanged={props.onPageChanged}
                    currentPage={props.currentPage}/>

                {props.pagEnd.length > 0 && <span className={S.users_lists__dotes}>... </span>}
                <Pagination
                    currentArray={props.pagEnd}
                    onPageChanged={props.onPageChanged}
                    currentPage={props.currentPage}/>
            </div>

            {props.items.map(el => {
                return (
                    <User key={el.id} user={el}
                          followingInProgress={props.followingInProgress}
                          unFollow={props.unFollow} follow={props.follow}/>
                )
            })}
        </div>
    )
})
