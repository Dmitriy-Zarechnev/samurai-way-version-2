import React from 'react'
import S from './TextAreaForm.module.css'
import {FieldError, UseFormRegister} from 'react-hook-form'

type TextAreaFormPropsType = {
    value: string,
    register: UseFormRegister<any>,
    errors: FieldError | undefined
}

export const TextAreaForm = React.memo((props: TextAreaFormPropsType) => {
    return (
        <div>
            <label className={S.label} htmlFor={props.value}>New {props.value}</label>
            <textarea id={props.value}
                      placeholder={`Your ${props.value} begins here ...`}
                      {...props.register(props.value, {required: true})}
                      className={`${S.textarea} ${props.errors ? S.errorClass : ''}`}
            />

            {<span className={`${S.span} ${props.errors ? S.errorDisplay : S.spanDisplay}`}>
                    {props.value} field is required
                </span>}
        </div>
    )
})

