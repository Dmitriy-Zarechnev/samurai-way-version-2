import {AppInitialState, appReducer, initializedSuccess} from '../reducers/app-reducer'

test('app reducer should return initialized === true', () => {

    const state: AppInitialState = {
        initialized: false
    }

    const newState = appReducer(state, initializedSuccess())

    expect(newState.initialized).toBe(true)
})