import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import S from './UsersSearchForm.module.css'
import {ProfileInputForm} from '../../../../../common/profileInputForm/ProfileInputForm'
import {Button} from '../../../../../common/button/Button'
import {UsersFilterType} from '../../../../../../redux/reducers/users-reducer'
import {useSelector} from 'react-redux'
import {getUsersFilterS} from '../../../../../../redux/selectors/users-selectors'

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: UsersFilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friends: FriendFormType
}


export const UsersSearchForm = React.memo((props: UsersSearchFormPropsType) => {
    // -----------  React-hook-form hook  ------------------
    const {
        register,
        handleSubmit
    } = useForm<FormType>({shouldUnregister: true})

    // Используем хук useSelector и получаем данные из state
    const filter = useSelector(getUsersFilterS)

    // ------------- Данные из form ---------------
    const onSubmit: SubmitHandler<FormType> = (data) => {
        // Преобразовали из строк в boolean и null
        const filter: UsersFilterType = {
            term: data.term,
            friends: data.friends === 'null' ? null : data.friends === 'true'
        }
        props.onFilterChanged(filter)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={S.form_wrapper}>
            <div className={S.inputs}>
                <ProfileInputForm
                    register={register}
                    value={'term'}
                    id={'term'}
                    name={'Users Search'}
                    addInputClass={S.inputFind}
                    addLabelClass={S.label}
                    defValue={filter.term}

                />

                <select defaultValue={String(filter.friends) as FriendFormType} {...register('friends')}>
                    <option value="null">All</option>
                    <option value="true">Only Followed</option>
                    <option value="false">Only Unfollowed</option>
                </select>
            </div>
            <Button name={'Find'} additionalClass={S.button}/>
        </form>
    )
})

