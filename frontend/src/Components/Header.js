import {BrowserRouter, Link, Route, Switch, useHistory} from 'react-router-dom';
import React, { Component, useContext, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {UserContext} from "../Helpers/Context";



export default function Header(){
    const {userState, setUserState} = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {

        if(sessionStorage.getItem('username')){
            setUserState({loggedIn:true, username:sessionStorage.getItem('username'),id:sessionStorage.getItem('id')});
            console.log('Logged');
        }else{
            setUserState({loggedIn:false});
        }

    }, []);

    async function logout(){
        setUserState({loggedIn:false});
        sessionStorage.clear();
        await fetch('http://localhost:3001/users/logout');
    }

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Button color="secondary" onClick={(()=> history.push("/home"))} style={{fontFamily:"Reggae One, cursive", fontSize:"26px"}}>Home</Button>
                <Button color="secondary" onClick={(()=> history.push("/posts"))} style={{fontFamily:"Reggae One, cursive", fontSize:"26px"}}>Posts</Button>
                {
                userState.loggedIn === true?
                [<Button color="secondary" onClick={(()=> history.push('/profile/'+userState.id))} style={{fontFamily:"Reggae One, cursive", fontSize:"26px"}}>Profile</Button>,
                    <Button href="" color="secondary" onClick={logout} style={{fontFamily:"Reggae One, cursive", fontSize:"26px"}}>Log out</Button>
                ]:
                [<Button color="secondary" onClick={(()=> history.push("/sign-up"))}  style={{fontFamily:"Reggae One, cursive", fontSize:"26px"}}>Sign Up</Button>,
                    <Button color="secondary" onClick={(()=> history.push("/sign-in"))} style={{fontFamily:"Reggae One, cursive", fontSize:"26px"}}>Sign In</Button>]
                }
            </Toolbar>
        </AppBar>
    );
}