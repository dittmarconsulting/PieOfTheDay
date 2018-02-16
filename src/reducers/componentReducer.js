/**
 * the reducer for all components including the store
 *
 * Created by Tom on 16/02/18
 */

import C from '../constants'

// define the init state
const initState = {
    'storeSynced': false
}

// all reducers for the components
const componentState = (state=initState, action) => {

    switch(action.type) {

        // in case of a `storeSynced` state change
        case C.STORE_SYNCED:

            return {
                ...state,
                'storeSynced': action.payload
            }

        default: return state
    }
}

export default componentState
