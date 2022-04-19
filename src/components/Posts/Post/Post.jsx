import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useNavigate } from "react-router-dom";

// https://www.keepinspiring.me/wp-content/uploads/2021/05/aa-milne-i-do-nothing-every-day-funny-quote.png

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    // const likes = () => {
    //     if (post.likes.length > 0) {
    //         return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
    //             ? (
    //                 console.log("ThumbUpAltIcon", post.title)
    //             ) : (
    //                 console.log("ThumbUpAltOutlined", post.title)
    //             );
    //     }

    //     console.log("ThumbUpAlt final return")
    // };

    // likes()

    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }


    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };


    return (
        <Card className={classes.card} elevation={6}>

            <CardMedia
                className={classes.media}
                image={post.selectedFile || "https://www.keepinspiring.me/wp-content/uploads/2021/05/aa-milne-i-do-nothing-every-day-funny-quote.png"}
                title={post.title}
            />
            <div className={classes.overlay}>
                <Typography
                    variant="h6"
                >
                    {post.name}

                </Typography>
                <Typography
                    variant="body2"
                >
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>

            {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
                <div
                    className={classes.overlay2}
                >
                    <Button
                        style={{ color: "White" }}
                        size="small"
                        onClick={() => { setCurrentId(post._id) }}
                    >
                        <MoreHorizIcon
                            fontSize="medium"
                        />
                    </Button>
                </div>
            )}
            <ButtonBase
                // component="span"
                className={classes.cardAction}
                onClick={openPost}
            >
                <div
                    className={classes.details}
                >
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="h2"
                    >
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography
                    className={classes.title}
                    gutterBottom
                    variant="h5"
                    component="h2"
                >
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions
                className={classes.cardActions}
            >
                <Button
                    size="small"
                    color="primary"
                    disabled={!user?.result}
                    onClick={() => { dispatch(likePost(post._id)) }}
                >
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result._id === post?.creator) && (
                    <Button
                        size="small"
                        color="primary"
                        disabled={!user?.result}
                        onClick={() => { dispatch(deletePost(post._id)) }}
                    >
                        <DeleteIcon
                            fontSize="small"
                        />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card >
    );
}

export default Post;