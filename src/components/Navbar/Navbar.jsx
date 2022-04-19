import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import useStyles from "./styles";
import memoriesText from "../../Images/memories-Text.png";
import memoriesLogo from "../../Images/memories-Logo.png";
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGOUT } from "../../constants/actionTypes"
import decode from "jwt-decode"

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate("/")
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link className={classes.brandContainer} to="/">
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px"></img>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}
                        >{user?.result.name.charAt(0)}</Avatar>
                        <Typography
                            className={classes.userName}
                            variant="h6">
                            {user?.result.name}
                        </Typography>
                        <Button
                            variant="contained"
                            className={classes.logout}
                            onClick={logout}
                            color="secondary"
                        >Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary">
                        Sign in
                    </Button>
                )
                }
            </Toolbar>
        </AppBar>
    )
}
// 19: 13

export default Navbar