import React from 'react'
import S from './NewMessageArea.module.css'
import {SubmitHandler, useForm} from 'react-hook-form'
import {TextAreaForm} from '../../../../../common/textareaForm/TextAreaForm'
import {Button} from '../../../../../common/button/Button'

export type NewMessageAreaPropsType = {
    sendNewMessage: (message: string) => void
}

export const NewMessageArea = React.memo((props: NewMessageAreaPropsType) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<{ message: string }>()

    const onSubmit: SubmitHandler<{ message: string }> = (data) => {
        props.sendNewMessage(data.message)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={S.new_message}>
            <TextAreaForm value={'message'} register={register} errors={errors.message}/>
            <Button name={'Add New Message'}/>
        </form>
    )
})



