/**
 * this file combines all reducers of the app
 *
 * Created by Tom on 16/02/18
 */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import componentState from './componentReducer'
import pieState from './pieReducer'

// add all reducers here to match the initState
export default combineReducers({
    form: formReducer,
    componentState,
    pieState
})
