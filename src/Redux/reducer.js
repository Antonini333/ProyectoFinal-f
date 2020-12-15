const { LOGIN, CALL_POSTS } = require('./types');

const initialState ={
    user: {},
    posts: []
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                user: action.payload
            }
            case CALL_POSTS:
                return{
                    ...state,
                    posts: action.payload
                }
            default:
                return state
    }
}


export default reducer;