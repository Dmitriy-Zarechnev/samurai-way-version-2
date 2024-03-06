import React, {ChangeEvent, useEffect, useState} from 'react'
import S from './ProfileStatus.module.css'


type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}


export const ProfileStatusWithHooks = React.memo((props: ProfileStatusWithHooksPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(props.status)


    useEffect(() => {
        setNewStatus(props.status)
    }, [props.status])


    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(newStatus)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode
                ? <input onChange={onStatusChange} value={newStatus} onBlur={deactivateEditMode} autoFocus/>
                : <span className={S.outer_span}
                        onDoubleClick={activateEditMode}
                >
                    Status: <span className={S.inner_span}>
                    {props.status || 'No status'}
                </span>
            </span>
            }
        </div>
    )
})

