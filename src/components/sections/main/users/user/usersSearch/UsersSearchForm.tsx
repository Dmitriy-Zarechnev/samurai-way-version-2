import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import S from './UsersSearchForm.module.css'
import {ProfileInputForm} from '../../../../../common/profileInputForm/ProfileInputForm'
import {Button} from '../../../../../common/button/Button'
import {UsersFilterType} from '../../../../../../redux/reducers/users-reducer'

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: UsersFilterType) => void
}

type FormType = {
    term: string
    friends: 'true' | 'false' | 'null'
}


export const UsersSearchForm = React.memo((props: UsersSearchFormPropsType) => {
    const {
        register,
        handleSubmit
    } = useForm<FormType>()

    const onSubmit: SubmitHandler<FormType> = (data) => {
        // Преобразовали из строк в boolean и null
        const filter: UsersFilterType = {
            term: data.term,
            friends: data.friends === 'null' ? null : data.friends === 'true'
        }

        props.onFilterChanged(filter)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={S.wrapper}>
            <ProfileInputForm
                register={register}
                value={'term'}
                id={'term'}
                name={'Users Search'}/>
            <select {...register('friends')}>
                <option value="null">All</option>
                <option value="true">Only Followed</option>
                <option value="false">Only Unfollowed</option>
            </select>
            <Button name={'Find'}/>
        </form>
    )
})

