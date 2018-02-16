/**
* reducers for the pie data
*
* Created by Tom on 16/02/18
*/

'use strict'

import C from '../constants'

const initState = {
    pies: {
        pieLoadOffset: 0,
        stores: [],
        pieOftheDay: [],
        selectedPie: {},
        sortMode: 'asc'
    }
}

const pieState = (state = initState.pies, action) => {

    switch(action.type) {

        case C.SET_PIE_LOAD_OFFSET :
            return {
                ...state,
                pieLoadOffset: action.payload
            }

        case C.SET_STORES :
            return {
                ...state,
                stores: action.payload
            }

        case C.SET_PIE_OF_THE_DAY :
            return {
                ...state,
                pieOftheDay: action.payload
            }

        case C.SET_SELECTED_PIE :
            return {
                ...state,
                selectedPie: action.payload
            }

        case C.SET_SORT_MODE :
            return {
                ...state,
                sortMode: action.payload
            }

        default : return state
    }

}

export default pieState
