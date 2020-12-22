export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null, //the current song is playing
    token: "BQDoN5dLz-ur4JU1WWqm8YFC1EgFgAs51B3Qm_XP99rwqNYvG0iFLD3UTQbj1s4oIs626ytBEiXpmOjzWflqIf7J_GcRidVX6-MNwSLs2LQ_Nz1do6Hz5AU0wJYW3ZPkd09xXwek5dfKuChycRmfiey2ZqTYo4OG7NHiYhgbadkvauM2",
    // playlists: null,
}

export const reducer = (state, action) => {
    // Acrtion => type, [payload]
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            }
    }
}

export default reducer;