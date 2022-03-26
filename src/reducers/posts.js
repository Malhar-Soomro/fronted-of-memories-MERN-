export default (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...posts, action.payload];
        // case "FETCH_ONE":
        //     return action.payload;
        default:
            return posts;
    }
}

// export default () => {
//     console.log("hello from reducers/posts")

// }