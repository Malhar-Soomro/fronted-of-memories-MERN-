import React from "react";
import { Container } from '@material-ui/core';
import PostDetails from "./components/PostDetails/PostDetails";

import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home/Home.jsx";
import Auth from "./components/Auth/Auth.jsx"

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"))

    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/posts" />} />
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/auth" exact element={!user ? <Auth /> : <Home />} />
                    <Route path="/posts/:id" exact element={<PostDetails />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;