import React from 'react'
import {useSelector} from 'react-redux'
import {chatStatusS} from '../../../../../redux/selectors/chat-selector'
import {useAppDispatch} from '../../../../../redux/types/Types'
import {sendChatMessage} from '../../../../../redux/reducers/chat-reducer'
import {SubmitHandler, useForm} from 'react-hook-form'
import S from './ChatAddMessageForm.module.css'
import {TextAreaForm} from '../../../../common/textareaForm/TextAreaForm'
import {Button} from '../../../../common/button/Button'

export const ChatAddMessageForm = () => {
    // Используем хук useSelector и получаем данные из state
    const status = useSelector(chatStatusS)

    //  Используем хук useAppDispatch и получаем dispatch
    const dispatch = useAppDispatch()

    // React hook Form
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<{ message: string }>()

    // Отправка message в state
    const onSubmit: SubmitHandler<{ message: string }> = (data) => {
        dispatch(sendChatMessage(data.message)).then(() => reset())
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={S.new_message}>
            <TextAreaForm value={'message'} register={register} errors={errors.message}/>
            <Button name={'Add New Message'} disabled={status !== 'ready'}/>
        </form>
    )
}
