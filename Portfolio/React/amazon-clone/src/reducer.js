export const initialState = {
    basket: [],
}

export const getBasketTotal = (basket) => {
    let value = basket?.reduce((amount, item) => {
        return amount + item.price
    }, 0);
    return value;
}
export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.payload)
            }
        case 'ADD2_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket]
            }
        default:
            return state
    }
}
export default reducer;
