import * as PieActions from '../src/actions/pieActions'
import fetch from 'jest-fetch-mock'

import configureMockStore from 'redux-mock-store' // mock store
import thunk from 'redux-thunk'
import C from '../src/constants'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

/* -----------------------------------------------------------------------------
    STORE ARRAY FOR MOCKING FETCH
----------------------------------------------------------------------------- */

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
        'priceString': '$2.30',
        'isPieOfTheDay': true
    }]
}]

const pieOfTheDayArray = [{
    'cheapestPrice':230,
    'id':1,
    'isCheaper':true,
    'pieData':{
        'displayName':'Chicken',
        'id':1,
        'isPieOfTheDay':true,
        'price':230,
        'priceString':'$2.30',
        'quantity':5,
        'storeId':6
    },
    'storeData':{
        'address':'500 Flinders Street',
        'city':'Melbourne',
        'coords':{
            'latitude':'-37.8102131',
            'longitude':'144.9681231'
        },
        'displayName':'Craigs Hot Food',
        'id':6,
        'mobile':'0466122344',
        'pies':[
            {
                'displayName':'Chicken',
                'id':1,
                'isPieOfTheDay':true,
                'price':230,
                'priceString':'$2.30',
                'quantity':5,
                'storeId':6
            }
        ],
        'postcode':'3000',
        'rating':4,
        'state':'Victoria'
    }
}]

/* -----------------------------------------------------------------------------
    TESTS
----------------------------------------------------------------------------- */

it('should change the `pieLoadOffset` number to 3', () => {

    // set mock REDUX store
    const store = mockStore({})
    // invoke action
    store.dispatch(PieActions.setPieLoadOffset(3))
    const actions = store.getActions()

    // check
    expect(actions[0].type).toBe('SET_PIE_LOAD_OFFSET')
    expect(actions[0].payload).toBe(3)
})

/* ---------------------------------------------------------------------------*/

it('should change set the `stores` array', () => {

    // set mock REDUX store
    const store = mockStore({})
    // invoke action
    store.dispatch(PieActions.setStores(storeArray))
    const actions = store.getActions()

    // check
    expect(actions[0].type).toBe('SET_STORES')
    expect(actions[0].payload[0].displayName).toBe('Craigs Hot Food')
    expect(actions[0].payload[0].pies[0].price).toBe(230)
})

/* ---------------------------------------------------------------------------*/

it('should change set the `pieOftheDay` array', () => {

    // set mock REDUX store
    const store = mockStore({
        pieState: {
            stores: storeArray
        }
    })

    // invoke action
    store.dispatch(PieActions.setPoD())

    // set the return expectation
    const expectedActions = [
        { type: C.SET_PIE_OF_THE_DAY, payload: pieOfTheDayArray }
    ]

    // check
    expect(store.getActions()).toEqual(expectedActions)
})

/* ---------------------------------------------------------------------------*/

it('should return the `chicken` pie of the `pieOftheDay` array', () => {

    // set mock REDUX store
    const store = mockStore({
        pieState: {
            pieOftheDay: pieOfTheDayArray
        }
    })

    // invoke action
    store.dispatch(PieActions.searchPies('chick'))
    const actions = store.getActions()

    // check
    expect(actions[0].type).toBe('SET_PIE_OF_THE_DAY')
    expect(actions[0].payload[0].pieData.displayName).toBe('Chicken')
})

it('should return no pie object for search str `mush`', () => {

    // set mock REDUX store
    const store = mockStore({
        pieState: {
            pieOftheDay: pieOfTheDayArray
        }
    })

    // invoke action
    store.dispatch(PieActions.searchPies('mush'))
    const actions = store.getActions()

    // check
    expect(actions[0].type).toBe('SET_PIE_OF_THE_DAY')
    expect(actions[0].payload).toEqual([])
})

/* ---------------------------------------------------------------------------*/

it('mock the API call to get the `stores` array', () => {

    // set the return expectation
    const expectedActions = [
        { type: C.SET_STORES, payload: storeArray },
        { type: C.SET_PIE_LOAD_OFFSET, payload: 1 },
        { type: C.SET_PIE_OF_THE_DAY, payload: pieOfTheDayArray }
    ]

    // set mock REDUX store
    const store = mockStore({
        pieState: {
            pieLoadOffset: 0,
            stores: storeArray,
            pieOftheDay: pieOfTheDayArray
        }
    })

    // set mock ASYNC response
    fetch.mockResponses(
        [JSON.stringify({payload: storeArray})],
        [JSON.stringify({payload: 1})],
        [JSON.stringify({payload: pieOfTheDayArray})]
    )

    // invoke async mock call
    return store.dispatch(PieActions.getStores())
        .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })

})
