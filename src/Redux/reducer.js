const { LOGIN, POSTS, ALL_USERS, UPDATE, UPDATE_FOLLOW } = require('./types');

const initialState ={
    user: {},
    users: [],
    posts: []
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                user: action.payload
            }
            case UPDATE:
                return{
                    ...state,
                    user: action.payload
                }
                case UPDATE_FOLLOW:
                    return{
                        ...state,
                        user: action.payload
                    }
            case POSTS:
                return{
                    ...state,
                    posts: action.payload
                }
                case ALL_USERS:
                    return{
                        ...state,
                        users: action.payload
                    }
            default:
                return state
    }
}


export default reducer;