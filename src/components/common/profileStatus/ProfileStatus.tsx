import React, {ChangeEvent} from 'react'
import S from './ProfileStatus.module.css'


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.PureComponent<ProfileStatusPropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<StateType>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={S.profile_info__text}>
                {this.state.editMode
                    ? <input onChange={this.onStatusChange} value={this.state.status} onBlur={this.deactivateEditMode} autoFocus/>
                    : <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>}
            </div>
        )
    }
}

