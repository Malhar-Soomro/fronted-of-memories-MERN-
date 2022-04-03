import * as api from "../api";

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        //what to do
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
        console.log(error);
    }
}



export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: "UPDATE", payload: data })

    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: "DELETE", payload: id })

    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        console.log("in likepost action")
        const { data } = await api.likePost(id);
        console.log("data -->", data)
        dispatch({ type: "LIKE", payload: data })
    } catch (error) {
        console.log(error);
    }
}