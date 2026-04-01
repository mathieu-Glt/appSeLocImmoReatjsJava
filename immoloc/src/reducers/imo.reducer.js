import { GET_PRODUCTS, GET_PRODUCTS_BY_ID, GET_PRODUCTS_FOR_SALE, GET_FILTERED_PRODUCTS, GET_PRODUCTS_FOR_RENTAL, GET_PRODUCTS_FOR_BUY } from "../actions/imo.actions";

const initialState = {
    products: [],
    product: null,
    productOfSale: [],
    productOfFilter: [],
    productOfRental: [],
    productOfBuy: []
};


export default function imoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case GET_PRODUCTS_BY_ID:
            return {
                ...state,
                product: action.payload
            };   
        case GET_PRODUCTS_FOR_SALE:
            return {
                ...state,
                productOfSale: action.payload
            };   
        case GET_FILTERED_PRODUCTS:
            return {
                ...state,
                productOfFilter: action.payload
            };   
        case GET_PRODUCTS_FOR_RENTAL:
            return {
                ...state,
                productOfRental: action.payload
            };   
        case GET_PRODUCTS_FOR_BUY:
            return {
                ...state,
                productOfBuy: action.payload
            };   
                                                         
        default:
            return state;
    }
}