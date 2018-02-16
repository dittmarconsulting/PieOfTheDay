import * as PieActions from '../src/actions/pieActions'
import fetch from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store' // mock store
import thunk from 'redux-thunk'
import store from '../src/store'
import C from '../src/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

it('should change the `pieLoadOffset` number to 3', () => {

    // invoke action
    const action = PieActions.setPieLoadOffset(3)

    // check
    expect(action.type).toBe('SET_PIE_LOAD_OFFSET')
    expect(action.payload).toBe(3)
})

it('should change set the `stores` array', () => {

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

    // invoke action
    const action = PieActions.setStores(storeArray)

    // check
    expect(action.type).toBe('SET_STORES')
    expect(action.payload[0].displayName).toBe('Craigs Hot Food')
    expect(action.payload[0].pies[0].price).toBe(230)
})
