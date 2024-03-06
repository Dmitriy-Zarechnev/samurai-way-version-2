import React from 'react'
import S from './Button.module.css'


type ButtonPropsType = {
    name: string
    onClick?: () => void
    disabled?: boolean
    additionalClass?: string
    type?: 'submit' | 'reset'
}

export const Button = React.memo((props: ButtonPropsType) => {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            className={`${S.button} ${props.additionalClass}`}
            type={props.type}>
            {props.name}
        </button>
    )
})



