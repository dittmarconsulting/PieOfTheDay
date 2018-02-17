/**
 * action creators for the pies
 *
 * Created by Tom on 16/02/18
 */
import { Alert } from 'react-native'

import C from '../constants'

/* -----------------------------------------------------------------------------
    ALL ACTION CREATORS FOR the pieState
----------------------------------------------------------------------------- */

// set pieLoadOffset
export const setPieLoadOffset = number => {
    return {
        type: C.SET_PIE_LOAD_OFFSET ,
        payload: number
    }
}

// set stores
export const setStores = array => {
    return {
        type: C.SET_STORES,
        payload: array
    }
}

// set allPies
export const setPieOfTheDay = array => {
    return {
        type: C.SET_PIE_OF_THE_DAY,
        payload: array
    }
}

// set selectedPie
export const setSelectedPie = object => {
    return {
        type: C.SET_SELECTED_PIE,
        payload: object
    }
}

// set sortMode
export const setSortMode = string => {
    return {
        type: C.SET_SORT_MODE,
        payload: string
    }
}

/* -----------------------------------------------------------------------------
    ALL SUPPORTING ACTION CREATORS
----------------------------------------------------------------------------- */

// set pie of the day array
export const setPoD = () =>
    (dispatch, getState) => {

        const storeArray = getState().pieState.stores

        // create an empty pie of the day array
        let pieOftheDay = []

        // it is cheaper to get the pies from the store array than make
        // an extra call to load the stores
        // loop over the store array and extract
        // the "pie of the day" (quantity < 0 && isPieOfTheDay = true)
        storeArray.map(storeData => {

            // check if array exists
            if(storeData.hasOwnProperty('pies')) {

                // find the cheapest price in array
                const cheapestPrice = Math.min.apply(Math,storeData.pies
                    .filter(pie => pie.quantity > 0)
                    .map(pie => pie.price)
                )

                // find the pie object that has prop isPieOfTheDay
                const pieData = storeData.pies
                    .find(pie => pie.isPieOfTheDay === true)

                // check if a store doesn't have a "pie of the day" on offer
                if(pieData) {

                    // push the object into the array
                    pieOftheDay.push({
                        id: pieOftheDay.length + 1,
                        pieData,
                        storeData,
                        isCheaper: (cheapestPrice < pieData.price) ? false : true,
                        cheapestPrice
                    })
                }
            }
        })

        // sort the array
        dispatch(sortPoD('asc'))

        // set the array in the store
        dispatch(setPieOfTheDay(pieOftheDay))
    }

// sort the "pie of the day" asc or desc
export const sortPoD = (mode) =>
    (dispatch, getState) => {

        // get the array
        const pieOftheDay = [
            ...getState().pieState.pieOftheDay
        ]

        // sort the array
        if(mode === 'asc') {
            pieOftheDay.sort((a, b) => a.pieData.price < b.pieData.price)
        } else  if(mode === 'desc') {
            pieOftheDay.sort((a, b) => a.pieData.price > b.pieData.price)
        }

        // set the sort mode
        dispatch(setSortMode(mode))

        // set the array in the store
        dispatch(setPieOfTheDay(pieOftheDay))
    }

// search pies
export const searchPies = (searchText) =>
    (dispatch, getState) => {

        if(searchText) {

            // get the array
            const pieOftheDay = [
                ...getState().pieState.pieOftheDay
            ]

            // set the array in the store
            dispatch(setPieOfTheDay(pieOftheDay
                .filter(element => element.pieData.displayName
                    .toLowerCase().includes(searchText.toLowerCase()))
            ))

        } else {

            // extract the PoD from the store array
            dispatch(setPoD())
        }

    }

// load all stores via API call
export const getStores = () =>
    (dispatch, getState) => {

        // set the headers
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            cache: 'default'
        }

        // set the page number
        const offset = (getState().pieState)
        ? getState().pieState.pieLoadOffset + 1
        : 1
        
        // how many pies to load in a single fetch
        const limit = 5

        // poluate the URL based on pagination
        // https://pie.now.sh/stores?_embed=pies&_page=2&_limit=5
        const url = 'https://pie.now.sh/stores?_embed=pies' +
            '&_page=' + offset +
            '&_limit=' + limit

        //fetch pies
        return fetch(url, headers)
            .then((response) => response.json())
            .then(data => {

                if(data) {

                    // appending new array to extisting array
                    const newStores = [
                        ...getState().pieState.stores,
                        ...data
                    ]

                    // set the stores
                    dispatch(setStores(newStores))

                    // set the offset
                    dispatch(setPieLoadOffset(offset))

                    // set the pies of the day array
                    dispatch(setPoD())

                }
            })
            .catch(error => {

                // display native Alert
                Alert.alert(
                    'An error occurred while fetching the pies.',
                    error,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                console.log(error)
                            }
                        }
                    ]
                )
            })
    }
