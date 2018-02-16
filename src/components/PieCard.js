/**
* this component displays the pie information
*
* Created by Tom on 16/02/18
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreator } from '../actions/index'

class PieCard extends Component {

    _onClick(pie) {
        const { setSelectedPie } = this.props
        // store selected pie object in store
        setSelectedPie(pie)
        // go to map
        Actions.storeMap({})
    }

    render() {

        const { cardObj } = this.props

        let pieName = ''
        let piePrice = '$0.00'
        let pieQuantity = 0
        let storeName = ''
        let storeAddress = ''
        let storeCity = ''
        let storeMobile = ''
        let storeRating = 0

        // check if we have a pieData object
        if(cardObj.hasOwnProperty('pieData')) {
            pieName = cardObj.pieData.displayName
            piePrice = cardObj.pieData.priceString
            pieQuantity = 'qty: ' + cardObj.pieData.quantity
        }

        // check if we have a storeData object
        if(cardObj.hasOwnProperty('storeData')) {
            storeName = cardObj.storeData.displayName
            storeAddress = cardObj.storeData.address
            storeCity = cardObj.storeData.postcode + ', ' + cardObj.storeData.city
            storeMobile = cardObj.storeData.mobile
            storeRating = cardObj.storeData.rating
        }

        // determine which pie image to load
        let pieImgSrc = null
        switch (pieName) {
            case 'Beef': pieImgSrc = require('../assets/images/beef.png')
                break
            case 'Beef and curry': pieImgSrc = require('../assets/images/beef-curry.png')
                break
            case 'Chicken': pieImgSrc = require('../assets/images/chicken.png')
                break
            case 'Beef and bacon': pieImgSrc = require('../assets/images/beef-curry.png')
                break
            case 'Kangaroo': pieImgSrc = require('../assets/images/kangaroo.png')
                break
            case 'Pork': pieImgSrc = require('../assets/images/pork.png')
                break
            case 'Beef and mushroom': pieImgSrc = require('../assets/images/beef-mushroom.jpg')
                break
            default: pieImgSrc = require('../assets/images/img_not_available.png')
        }

        // determine whether to show thumb up or down
        const thumbSrc = cardObj.isCheaper
            ? require('../assets/images/thumbs-up.png')
            : require('../assets/images/thumbs-down.png')

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => ::this._onClick(cardObj)}>
                <View style={styles.leftContainer}>
                    <Image
                        style={styles.pieImage}
                        source={pieImgSrc} />
                </View>
                <View style={styles.rightContainer}>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={styles.nameText}>{pieName}</Text>
                    <View style={styles.priceQtyContainer}>
                        <Text style={styles.priceQtyText}>{piePrice}</Text>
                        <Text style={styles.priceQtyText}>{pieQuantity}</Text>
                    </View>
                    <Text style={styles.storeText}>{storeName}</Text>
                    <Text style={styles.storeText}>{storeAddress}</Text>
                    <Text style={styles.storeText}>{storeCity}</Text>
                    <Text style={styles.storeText}>{storeMobile}</Text>

                    {/* rating & is cheaper container */}
                    <View style={styles.ratingCheaperContainer}>
                        <View style={styles.ratingContainer}>
                            <Image
                                style={styles.starImage}
                                source={require('../assets/images/star.png')} />
                            <Text style={styles.priceQtyText}>{storeRating}</Text>
                        </View>
                        <Image
                            style={styles.thumbImage}
                            source={thumbSrc} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        height: 170,
        marginBottom: 10,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(239, 238, 255)',
        borderWidth: 1,
        elevation   : 8,
        shadowColor: 'rgba(162, 169, 178, 0.1)',
        shadowOffset: {
            width: 0,
            height: 3.5
        },
        shadowRadius: 8.5,
        shadowOpacity: 1
    },
    leftContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        marginLeft: 10
    },
    pieImage: {
        width: 150,
        height: 150
    },
    rightContainer: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    nameText: {
        fontWeight: 'bold',
        color: 'rgb(118,118,118)',
        fontSize: 20,
        lineHeight: 30,
        backgroundColor: 'transparent'
    },
    priceQtyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceQtyText: {
        fontWeight: 'bold',
        color: 'rgb(0,0,0)',
        fontSize: 14,
        lineHeight: 25,
        backgroundColor: 'transparent'
    },
    storeText: {
        fontWeight: 'normal',
        color: 'rgb(118,118,118)',
        fontSize: 14,
        lineHeight: 17,
        backgroundColor: 'transparent'
    },
    ratingCheaperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 25,
        marginTop: 5
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 45
    },
    starImage: {
        width: 23,
        height: 23
    },
    thumbImage: {
        width: 23,
        height: 23
    }
}

// define the prop types
PieCard.propTypes = {
    setSelectedPie: PropTypes.func.isRequired,
    cardObj: PropTypes.object
}

// pull all required action creators into this container
const mapDispatchToProps = (dispatch) => {
    const action = bindActionCreators(ActionCreator, dispatch)
    return {
        setSelectedPie: action.setSelectedPie
    }
}

export default connect(null, mapDispatchToProps)(PieCard)
