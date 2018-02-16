import C from '../src/constants'
import appReducer from '../src/reducers/index'

/* --------------------------- componentReducer.js -------------------------- */

it('`storeSynced` state should change to true', () => {

    // invoke reducer and return the new state
    const state = appReducer({}, {
        type: C.STORE_SYNCED,
        payload: true
    })
    // check
    expect(state.componentState.storeSynced).toBe(true)
})

/* ------------------------------ pieReducer.js ----------------------------- */

it('`pieLoadOffset` state should change to 2', () => {

    // invoke reducer and return the new state
    const state = appReducer({}, {
        type: C.SET_PIE_LOAD_OFFSET,
        payload: 2
    })
    // check
    expect(state.pieState.pieLoadOffset).toBe(2)
})

it('`stores` state should add an store object', () => {

    // define the store array
    const storeArray = [{
        'id': 6,
        'displayName': 'Craigs Hot Food',
        'address': '500 Flinders Street',
        'city': 'Melbourne',
        'state': 'Victoria',
        'postcode': '3000',
        'mobile': '0466122344',
        'coords': {
            'latitude': '-37.8102131',
            'longitude': '144.9681231'
        },
        'rating': 4,
        'pies': [{
            'id': 1,
            'storeId': 6,
            'displayName': 'Chicken',
            'quantity': 5,
            'price': 230,
            'priceString': '$2.30'
        }]
    }]

    // invoke reducer and return the new state
    const state = appReducer({}, {
        type: C.SET_STORES,
        payload: storeArray
    })
    // check
    expect(state.pieState.stores[0].id).toBe(6)
    expect(state.pieState.stores[0].pies[0].displayName).toBe('Chicken')
})

it('`selectedPie` state should display an store object', () => {

    // define the store object
    const storeObj = {
        'id': 6,
        'displayName': 'Craigs Hot Food',
        'address': '500 Flinders Street',
        'city': 'Melbourne',
        'state': 'Victoria',
        'postcode': '3000',
        'mobile': '0466122344',
        'coords': {
            'latitude': '-37.8102131',
            'longitude': '144.9681231'
        },
        'rating': 4,
        'pies': [{
            'id': 1,
            'storeId': 6,
            'displayName': 'Chicken',
            'quantity': 5,
            'price': 230,
            'priceString': '$2.30'
        }]
    }

    // invoke reducer and return the new state
    const state = appReducer({}, {
        type: C.SET_SELECTED_PIE,
        payload: storeObj
    })
    // check
    expect(state.pieState.selectedPie.displayName).toBe('Craigs Hot Food')
    expect(state.pieState.selectedPie.pies[0].quantity).toBe(5)
})

it('`sortMode` state should change to `desc`', () => {

    // invoke reducer and return the new state
    const state = appReducer({}, {
        type: C.SET_SORT_MODE,
        payload: 'desc'
    })
    // check
    expect(state.pieState.sortMode).toBe('desc')
})
