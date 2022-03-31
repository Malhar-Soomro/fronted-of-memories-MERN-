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



export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        console.log("update post function in actions")
        dispatch({ type: "UPDATE", payload: data })

    } catch (error) {

    }
}