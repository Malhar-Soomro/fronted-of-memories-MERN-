import * as api from "../api";

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: "FETCH_ALL", payload: data })

    } catch (error) {
        console.log(error.message)

    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        console.log(data)
        console.log(typeof (data))
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        // console.log(error);
    }
}



// for understanding purpose of redux
// export const getOnePost = () => async (dispatch) => {
//     try {
//         const { data } = await api.fetchOnePost();
//         dispatch({ type: "FETCH_ONE", payload: data });
//     } catch (error) {
//         console.log(error.message)
//     }
// }