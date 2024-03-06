import React from 'react'
import {Icon} from '../icon/Icon'


type ContactsPropsType = {
    href: string
    iconId: string
}

export const Contacts = React.memo((props: ContactsPropsType) => {
    return (
        <a href={props.href} target={'_blank'}>
            <Icon iconId={props.iconId}/>
        </a>
    )
})

