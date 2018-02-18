/**
 * this is the redux store setting
 *
 * Created by Tom on 16/02/18
 */

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'

import rootReducer from './reducers/index'
import { ActionCreator } from './actions/index'
import C from './constants'
import { storageKey } from './config'

// link the combineReducer to the sync storage
const reducer = storage.reducer(rootReducer)

// create the engine with a key
const engine = createEngine(storageKey)

// create the engine middleware
const engineMiddleware = storage.createMiddleware(engine)

// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            ActionCreator
        }) : compose

// combine middleware
const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        engineMiddleware
    )
)

// create the redux store (passing the an empty object and init state)
const store = createStore(reducer, {}, enhancer)

// load the saved store and update the store with the saved version
// const load = storage.createLoader(engine)
// load(store)
//     .then(() => {
//
//         // set the flag 'storeSynced' to true
//         store.dispatch({
//             type: C.STORE_SYNCED,
//             payload: true
//         })
//     })
//     .catch(() => {
//         console.log('Failed to load previous state')
//     })

export default store
