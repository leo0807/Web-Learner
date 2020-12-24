export const initialState = {
    basket: [],
}
export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'ADD1_TO_BASKET':
            return {
                ...state,
                basket: [action.item]
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