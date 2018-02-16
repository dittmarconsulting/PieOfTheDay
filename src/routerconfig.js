/**
 * we use `react-native-router-flux` navigation
 * for this project, because REDUX is already inbuilt
 * https://github.com/aksonov/react-native-router-flux
 *
 * this file sets up the router and scene configuration
 *
 * Created by Tom on 16/02/18
 */

import React, { Component } from 'react'
import { Scene } from 'react-native-router-flux'

import RouterWithRedux from '../src/components/RouterWithRedux'
import ActionHeader from '../src/components/ActionHeader'

// all scenes
import PieList from '../src/scenes/PieList'
import StoreMap from '../src/scenes/StoreMap'


class RouterConfig extends Component {

    render() {
        return (
            <RouterWithRedux>

                <Scene
                    key="pieList"
                    component={PieList}
                    unmountScenes={true}
                    hideNavBar={false}
                    navBar={ActionHeader}
                    panHandlers={null}
                    hideTabBar
                    duration={0}
                    initial
                />

                <Scene
                    key="storeMap"
                    component={StoreMap}
                    unmountScenes={true}
                    hideNavBar={false}
                    navBar={ActionHeader}
                    panHandlers={null}
                    hideTabBar
                    duration={0}
                />

            </RouterWithRedux>
        )
    }
}

export default RouterConfig
