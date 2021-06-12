import React, {Component, useContext} from 'react';
import Container from '@material-ui/core/Container';
import AddPost from "../Components/AddPost";
import Photos from "../Components/Photos";
import {UserContext} from "../Helpers/Context";

export default function Home(props){
    const {userState, setUserState} = useContext(UserContext);

    return (
        <>
            <Container maxWidth="lg">
                <h1 style={{marginTop:"1em",color:"#a6bd40"}}>Hot posts</h1>
                { userState.loggedIn && <AddPost updatePhotos={props.photosState} photos={props.photos} />}
                {<Photos photos={props.photos}/>}
            </Container>
        </>
    );


}
