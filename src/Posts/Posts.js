import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = () => {
    const posts = useSelector((state) => {
        return state.posts;
    })
    console.log(posts)
    console.log(typeof (posts))
    return (
        <>
            <h1>POSTS</h1>
            <Post />
            <Post />
            <Post />
        </>
    );
}

export default Posts;