/**
 * `react-native-router-flux` doesn't record the current scene in the REDUX
 * store by default
 * this is a wrapper that connects the `Router` with the REDUX store (meta props)
 *
 *
 * Created by Tom on 16/02/18
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Reducer, Scene } from 'react-native-router-flux'

// custom animation style for the scenes
export const animationStyle = (props) => {
    const { layout, position, scene } = props
    const direction = (scene.navigationState && scene.navigationState.direction) ?
        scene.navigationState.direction : 'horizontal'
    const index = scene.index
    const inputRange = [index - 1, index, index + 1]
    const width = layout.initWidth
    const height = layout.initHeight
    const opacity = position.interpolate({
        inputRange,
        // no fading effect
        outputRange: [1, 1, 1],
    })
    const scale = position.interpolate({
        inputRange,
        // no scaling effect
        outputRange: [1, 1, 1],
    })

    let translateX = 0
    let translateY = 0

    switch (direction) {
        case 'horizontal':
            translateX = position.interpolate({
                inputRange,
                // swipe left/right without offsets
                outputRange: [width, 0, 0],
            })
            break
        case 'vertical':
            translateY = position.interpolate({
                inputRange,
                //swipe up/down without offsets
                outputRange: [height, 0, 0],
            })
            break
    }

    return {
        opacity,
        transform: [
            { scale },
            { translateX },
            { translateY },
        ],
    }
}

class RouterWithRedux extends Component {

    _reducerCreate (params) {
        const defaultReducer = new Reducer(params)
        return (state, action) => {
            return defaultReducer(state, action)
        }
    }

    // use the Android back button to go back to the previous screen
    _onAndroidBackButtonClick() {
        // TODO: no time do manage Android back button
    }

    render () {
        return (
            <Router
                createReducer={::this._reducerCreate}
                backAndroidHandler={::this._onAndroidBackButtonClick}
                animationStyle={animationStyle}>
                <Scene key="root">
                    {this.props.children}
                </Scene>
            </Router>
        )
    }
}

// define the prop types
RouterWithRedux.propTypes = {
    children: PropTypes.array
}

export default RouterWithRedux
