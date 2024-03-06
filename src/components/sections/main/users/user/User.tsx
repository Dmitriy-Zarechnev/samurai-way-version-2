import React from 'react'
import S from './User.module.css'
import {NavLink} from 'react-router-dom'
import min from '../../../../../assets/images/UserDefault.jpg'
import {Button} from '../../../../common/button/Button'
import {UsersListType} from '../../../../../redux/reducers/users-reducer'

type UserPropsType = {
    user: UsersListType
    followingInProgress: number[]
    unFollow: (id: number) => void
    follow: (id: number) => void
}


export const User = React.memo((props: UserPropsType) => {
    return (
        <div className={S.users_list}>
            <div className={S.users_up_list}>

                <NavLink to={`/profile/ ${props.user.id}`}>
                    <img src={props.user.photos.small ? props.user.photos.small : min}
                         alt={`${props.user.name}-AvatarImg`}
                         className={S.users_up_list__img}/>
                </NavLink>

                <p className={S.users_up_list__status}>
                    {props.user.status}
                </p>
            </div>
            <div className={S.users_down_list}>
                <NavLink to={`/profile/ ${props.user.id}`}>{props.user.name}</NavLink>

                <Button
                    name={props.user.followed ? 'UnFollow' : 'Follow'}
                    onClick={
                        props.user.followed
                            ? () => {
                                props.unFollow(props.user.id)
                            }
                            : () => {
                                props.follow(props.user.id)
                            }
                    }

                    additionalClass={
                        props.user.followed
                            ? `${S.users_down_list__btn} ${S.unfollow_red}`
                            : S.users_down_list__btn}

                    disabled={props.followingInProgress.some(id => id === props.user.id)}
                />
            </div>
        </div>
    )
})

