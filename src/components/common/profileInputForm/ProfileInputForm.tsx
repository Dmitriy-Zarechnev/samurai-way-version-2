import React from 'react'
import {UseFormRegister} from 'react-hook-form'
import S from './ProfileInputForm.module.css'

type ProfileInputFormPropsType = {
    register: UseFormRegister<any>,
    value: string,
    name: string,
    id: string,
    defValue?: string,
    addBoxClass?: string,
    addInputClass?: string,
    addLabelClass?: string
}

export const ProfileInputForm = React.memo((props: ProfileInputFormPropsType) => {
    return (
        <div className={`${S.box} ${props.addBoxClass}`}>
            <label className={`${S.label} ${props.addLabelClass}`}
                   htmlFor={props.id}>
                {props.name}
            </label>
            <input className={`${S.input} ${props.addInputClass}`}
                   id={props.id}
                   defaultValue={props.defValue}
                   {...props.register(props.value)}
            />
        </div>
    )
})

