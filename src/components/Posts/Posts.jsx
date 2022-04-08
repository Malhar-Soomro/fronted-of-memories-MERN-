import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyle from "./styles";

const Posts = ({ setCurrentId, setDeleteId, deleteId }) => {
    const classes = useStyle();
    const posts = useSelector((state) => {
        return state.posts;
    })

    return (
        !posts.length ? <CircularProgress /> : (
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
                        sm={6}
                        md={6}
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