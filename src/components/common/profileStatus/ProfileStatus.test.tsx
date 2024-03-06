import {create} from 'react-test-renderer'
import React from 'react'
import {ProfileStatus} from './ProfileStatus'

/*
describe('Component', () => {
    test('Matches', () => {
        const div = create(<div/>)
        expect(div.toJSON()).toMatchSnapshot()
    })
})
*/

describe('ProfileStatus Component', () => {

    test('Status from props should be in the state', () => {
        const component = create(
            <ProfileStatus
                status={'Test ProfileStatus'}
                updateStatus={() => {
                }}
            />)
        const root: any = component.getInstance()

        expect(root && root.state.status).toBe('Test ProfileStatus')
    })


    test('after render span should be here', () => {
        const component = create(
            <ProfileStatus
                status={'Span Test ProfileStatus'}
                updateStatus={() => {
                }}
            />)
        const root: any = component.root
        const span: any = root.findByType('span')

        expect(span).toBeTruthy()
    })

    test('after render span text should be from status', () => {
        const component = create(
            <ProfileStatus
                status={'Span Test ProfileStatus'}
                updateStatus={() => {
                }}
            />)
        const root: any = component.root
        const span: any = root.findByType('span')

        expect(span.props.children).toBe('Span Test ProfileStatus')
    })

    test('after render input should not be here', () => {
        const component = create(
            <ProfileStatus
                status={'Input Test ProfileStatus'}
                updateStatus={() => {
                }}
            />)
        const root: any = component.root
        const inputs: any = root.findAllByType('input')

        expect(inputs.length).toBe(0)
    })


    test('after doubleClick input should be displayed', () => {
        const component = create(
            <ProfileStatus
                status={'Input Test ProfileStatus'}
                updateStatus={() => {
                }}
            />)
        const root: any = component.root
        const span: any = root.findByType('span')
        span.props.onDoubleClick()
        const input: any = root.findByType('input')

        expect(input.props.value).toBe('Input Test ProfileStatus')
    })

    test('callback should be called', () => {

        const mockUpdateStatus = jest.fn()
        const component = create(
            <ProfileStatus
                status={'Callback Test ProfileStatus'}
                updateStatus={mockUpdateStatus}
            />)
        const instance: any = component.getInstance()
        instance.deactivateEditMode()

        expect(mockUpdateStatus).toHaveBeenCalled()
    })

})