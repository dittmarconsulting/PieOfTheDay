/**
 * this component displays the pies of the day from different stores
 *
 * Created by Tom on 16/02/18
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StatusBar, Platform, FlatList, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreator } from '../actions/index'
import PieCard from '../components/PieCard'

class PieList extends Component {

    constructor() {
        super()
        // FlatList has a bug that invokes onEndReached() more times. Here a solution:
        // https://github.com/facebook/react-native/issues/14015#issuecomment-310675650
        this.state = {
            onEndReachedCalledDuringMomentum: false
        }
    }

    componentDidMount() {
        const { getStores } = this.props
        // load the first 5 stores
        getStores()
    }

    _endReached() {
        const { getStores } = this.props

        if(!this.state.onEndReachedCalledDuringMomentum) {
            console.log('_endReached')
            // load the next 5 stores
            getStores()
            this.setState({onEndReachedCalledDuringMomentum: true})
        }
    }

    render() {

        const marginTop = (Platform.OS === 'ios') ? 64 : 44

        const { pieOftheDay } = this.props

        return (
            <View style={{...styles.container, marginTop}}>

                {/* set the status bar style */}
                <StatusBar
                    translucent={false}
                    animated={false}
                    hidden={false}
                    backgroundColor="transparent"
                    barStyle='light-content'/>

                <View style={styles.marginContainer}>

                    {/* pie of the day list */}
                    <View style={styles.listContainer}>
                        <FlatList
                            contentContainerStyle={styles.flatListContainer}
                            data={pieOftheDay}
                            extraData={pieOftheDay}
                            showsVerticalScrollIndicator={false}
                            automaticallyAdjustContentInsets={false}
                            onEndReachedThreshold={0}
                            onEndReached={::this._endReached}
                            onMomentumScrollBegin={() => this.setState({onEndReachedCalledDuringMomentum: false})}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                                <PieCard
                                    key={item.length}
                                    cardObj={item}
                                />
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1
    },
    marginContainer: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    textContainer: {
        marginTop: 50,
        height: 22
    },
    headerText: {
        fontWeight: 'bold',
        color: 'rgb(0,0,0)',
        fontSize: 20,
        lineHeight: 22,
        backgroundColor: 'transparent'
    },
    listContainer: {
        marginTop: 15,
    }
}

// define the prop types
PieList.propTypes = {
    getStores: PropTypes.func.isRequired,
    pieOftheDay: PropTypes.array
}

// pull props to this container
const mapStateToProps = (state) => {
    return {
        pieOftheDay: state.pieState.pieOftheDay
    }
}

// pull all required action creators into this container
const mapDispatchToProps = (dispatch) => {
    const action = bindActionCreators(ActionCreator, dispatch)
    return {
        getStores: action.getStores,
        setStoresPies: action.setStoresPies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieList)
