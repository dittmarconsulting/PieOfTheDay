/**
 * this is the entry class for the react-native app
 *
 * it wraps the Provider, which provides all child components with the
 * data of the Redux store
 *
 * Created by Tom on 16/02/18
 */


import React, { Component } from 'react'
import { Provider } from 'react-redux'

// get the REDUX store
import store from './store'

// load the app router layout
import RouterConfig from './routerconfig'

// exposing network requests in React Native Debugger, TODO: comment out for production
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <RouterConfig/>
            </Provider>
        )
    }
}

export default App
