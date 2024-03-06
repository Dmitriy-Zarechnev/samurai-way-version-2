import React from 'react'
import S from './InputForm.module.css'
import {FieldError, UseFormRegister} from 'react-hook-form'

type InputFormPropsType = {
    value: string,
    type: 'text' | 'password' | 'email',
    defValue?: string,
    placeholder?: string,
    register: UseFormRegister<any>,
    errors: FieldError | undefined,
}

export const InputForm = React.memo((props: InputFormPropsType) => {

    // Деструктуризация props
    const {
        value, type, defValue,
        placeholder, register, errors
    } = props


    return (
        <div className={S.wrapper}>
            <label className={S.label} htmlFor={value}>{value}</label>
            <input id={value}
                   type={type}
                   defaultValue={defValue || ''}
                   placeholder={placeholder || `Write your ${value}`}
                   {...register(value, {required: true})}
                   className={`${S.field} ${errors ? S.errorClass : ''}`}
            />

            {<span className={`${S.span} ${errors ? S.errorDisplay : S.spanDisplay}`}
            >{value} field is required</span>}
        </div>
    )
})

