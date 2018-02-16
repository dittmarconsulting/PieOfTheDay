/**
 * Action header component invokes Actions from react-native-router-flux
 *
 * Created by Tom on 16/02/18
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Platform, Animated, View, TouchableOpacity, TextInput, Image, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreator } from '../actions/index'

class ActionHeader extends Component {

    constructor(props) {
        super(props)
        //set local state (don't need to broadcast these values)
        this.state = {
            searchText: '',
            height: new Animated.Value(-20)
        }
    }

    componentDidMount() {
        // set the animation for the header
        Animated.timing(this.state.height, {
            toValue: 0,
            duration: 700,
        }).start()
    }

    _onChangeText(text) {
        const { searchPies } = this.props
        searchPies(text)
    }

    _sortPieArray() {
        const { sortMode, sortPoD } = this.props
        if(sortMode === 'asc') {
            sortPoD('desc')
        } else {
            sortPoD('asc')
        }
    }

    render() {

        const leftButtonImage = require('../assets/icons/backChevron.png')
        const height = (Platform.OS === 'ios') ? 64 : 44
        const paddingTop = (Platform.OS === 'ios') ? 20 : 0

        // header props
        let showBackChevron = true
        let showInput = true
        let showSortIcon = false
        let headerText = ''

        // show header text based on scenes
        switch (Actions.currentScene) {
            case 'pieList':
                // don't show back chevron
                showBackChevron = false
                showInput = true
                showSortIcon = true
            break
            case 'storeMap':
                headerText = 'Store Information'
                showInput = false
            break
            default:
                showBackChevron = true
                showInput = false
                showSortIcon = false
        }

        return (
            <Animated.View style={{...styles.container, transform: [
                {
                    translateY: this.state.height.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 3],
                    })
                }
            ]}}>
                <View style={{...styles.headerWrapper, height, paddingTop}}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            transparent
                            onPress={Actions.pop}>
                            {
                                (showBackChevron &&
                                <Image
                                    style={styles.image}
                                    source={leftButtonImage} />)
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerCenter}>
                        {
                            (showInput)
                            ? <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Search pie"
                                    placeholderTextColor="rgb(118, 118, 118)"
                                    autoFocus = {true}
                                    blurOnSubmit={false}
                                    autoCorrect={false}
                                    selectionColor={'rgba(255,255,255, 0.6)'}
                                    underlineColorAndroid='rgba(255,255,255, 0.01)'
                                    onChangeText = {::this._onChangeText}
                                    returnKeyType = {'go'}
                                    onSubmitEditing={::this._onChangeText}
                                />
                            </View>
                            :
                            <Text style={styles.headerText}>{headerText}</Text>
                        }
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            transparent
                            onPress={::this._sortPieArray}>
                            {
                                (showSortIcon &&
                                <Image
                                    style={styles.sortImage}
                                    resizeMode="cover"
                                    source={require('../assets/images/sort.png')} />)
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgb(41, 41, 46)'
    },
    headerWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(41, 41, 46)'
    },
    headerLeft: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerCenter: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputContainer: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255, 0.1)',
        height: 35,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputField: {
        color: 'rgb(255,255,255)'
    },
    headerRight: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        alignSelf: 'flex-start',
        marginLeft: 12,
        padding: 10
    },
    image: {
        width: 14.8
    },
    headerText: {
        fontSize: 19,
        fontWeight: '500',
        color: 'rgb(255, 255, 255)'
    },
    sortImage: {
        width: 40,
        height: 40
    }
}

// define the prop types
ActionHeader.propTypes = {
    searchPies: PropTypes.func.isRequired,
    sortPoD: PropTypes.func.isRequired,
    sortMode: PropTypes.string
}

// pull props to this container
const mapStateToProps = (state) => {
    return {
        sortMode: state.pieState.sortMode
    }
}

// pull all required action creators into this container
const mapDispatchToProps = (dispatch) => {
    const action = bindActionCreators(ActionCreator, dispatch)
    return {
        searchPies: action.searchPies,
        sortPoD: action.sortPoD
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionHeader)
