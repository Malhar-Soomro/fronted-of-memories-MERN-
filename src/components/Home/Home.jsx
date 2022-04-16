import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import useStyle from "./styles.js";
import Pagination from "../Pagination/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input"
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const classes = useStyle();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");



    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }
    const searchPost = () => {
        console.log(tags)
        if (search.trim() || tags) {
            console.log(tags.join(","))
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }))
            navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`)
        }
        else {
            navigate("/")
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


    return (
        <>

            <Grow in>
                <Container maxWidth="xl">
                    <Grid className={classes.mainContainer} container justifyContent="space-between" a lignItems="stretch" spacing={3} classes={classes.gridContainer} >
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>

                            <AppBar
                                className={classes.appBarSearch} position="static"
                                color="inherit"
                            >
                                <TextField
                                    name="search"
                                    variant="outlined"
                                    label="Search Memories"
                                    fullWidth
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); }}
                                    onKeyPress={handleKeyPress}

                                />
                                <ChipInput
                                    style={{ margin: "10px 0" }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button
                                    onClick={searchPost}
                                    className={classes.searchButton}
                                    color="primary"
                                    variant="contained"
                                >
                                    Search
                                </Button>
                            </AppBar>

                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <br />
                            <Paper elevation={8}>
                                <Pagination page={page} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home