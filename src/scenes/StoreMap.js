/**
* this component displays store location on a map
*
* Created by Tom on 16/02/18
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Platform, View, Text } from 'react-native'
import { connect } from 'react-redux'
import GoogleStaticMap from 'react-native-google-static-map'

import { googleKeys } from '../config'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').width

class StoreMap extends Component {
    render() {

        const { selectedPie } = this.props

        let storeName = ''
        let storeAddress = ''
        let storeCity = ''
        let storeMobile = ''
        let latitude = 0
        let longitude = 0

        // check if we have a storeData object
        if(selectedPie.hasOwnProperty('storeData')) {
            storeName = selectedPie.storeData.displayName
            storeAddress = selectedPie.storeData.address
            storeCity = selectedPie.storeData.postcode + ', ' + selectedPie.storeData.city
            storeMobile = selectedPie.storeData.mobile
            latitude = selectedPie.storeData.coords.latitude
            longitude = selectedPie.storeData.coords.longitude
        }

        const marginTop = (Platform.OS === 'ios') ? 64 : 44

        return (
            <View style={{...styles.container, marginTop}}>

                {/* show store information */}
                <View style={styles.infoContainer}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <Text style={styles.storeInfo}>{storeAddress}</Text>
                    <Text style={styles.storeInfo}>{storeCity}</Text>
                    <Text style={styles.storeInfo}>{storeMobile}</Text>
                </View>

                {/* show store location on a map */}
                <GoogleStaticMap
                    style={styles.mapContainer}
                    latitude={latitude}
                    longitude={longitude}
                    zoom={18}
                    size={{width, height}}
                    apiKey={googleKeys.placesAPIKey}
                />
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgb(119, 136, 153)'
    },
    infoContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapContainer: {
        flex:1,
    },
    storeName: {
        fontWeight: 'bold',
        color: 'rgb(255,255,255)',
        fontSize: 26,
        lineHeight: 50,
        backgroundColor: 'transparent'
    },
    storeInfo: {
        fontWeight: 'normal',
        color: 'rgb(255,255,255)',
        fontSize: 16,
        lineHeight: 18,
        backgroundColor: 'transparent'
    },
}

// define the prop types
StoreMap.propTypes = {
    selectedPie: PropTypes.object
}

// pull props to this container
const mapStateToProps = (state) => {
    return {
        selectedPie: state.pieState.selectedPie
    }
}

export default connect(mapStateToProps, null)(StoreMap)
