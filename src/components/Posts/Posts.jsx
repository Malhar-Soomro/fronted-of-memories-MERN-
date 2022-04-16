import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyle from "./styles";

const Posts = ({ setCurrentId, setDeleteId, deleteId }) => {
    const classes = useStyle();
    const { posts, isLoading } = useSelector((state) => {
        return state.posts;
    })

    if (!posts.length && !isLoading) return "no posts"

    return (
        isLoading ? <CircularProgress /> : (
            <Grid
                className={classes.mainContainer}
                container
                alignItems="stretch"
                spacing={3}
            >
                {posts.map((post) => (
                    <Grid key={post._id}
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={3}
                    >
                        <Post post={post} setCurrentId={setCurrentId} setDeleteId={setDeleteId} deleteId={deleteId} />
                    </Grid >
                ))
                }
            </Grid>
        )
    );
}

export default Posts;