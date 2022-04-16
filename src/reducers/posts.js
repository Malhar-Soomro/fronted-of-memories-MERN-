import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH } from "../constants/actionTypes";


const reducer = (state = [], action) => {
    switch (action.type) {
        // how to do
        case DELETE:
            return state.filter(post => post._id !== action.payload)
        case UPDATE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };
        case CREATE:
            console.log(state)
            return [...state, action.payload];
        default:
            return state;
    }
}

// export default () => {
//     console.log("hello from reducers/posts")

// }

export default reducer;