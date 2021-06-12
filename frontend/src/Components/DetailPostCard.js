import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ReportIcon from '@material-ui/icons/Report';
import {UserContext} from "../Helpers/Context";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "2em",
        marginBottom: "2em",
        maxWidth: "200em",
        fontFamily: "Goblin One, cursive"
    },
    media: {
        height: 0,
        width: "50em",
        paddingTop: '56.25%',
        fontFamily: "Goblin One, cursive"// 16:9
    }
}));


export default function DetailPostCard(props) {
    const classes = useStyles();
    const {userState, setUserState} = useContext(UserContext);
    const [postDetails, setPostDetails] = useState("");

    async function upvotePost(){
        await fetch('http://localhost:3001/photos/'+props.id+'/upvote-post/'+userState.id,{
            method: 'POST',
            credentials: 'include'
        });
        setPostDetails({...postDetails.numVotes,
            numVotes: postDetails.numVotes+1,
            name: postDetails.name,
            path: postDetails.path,
            date: postDetails.date,
            user:postDetails.user});
    }

    async function reportPost(){
        await fetch('http://localhost:3001/photos/'+props.id+'/report-post/'+userState.id,{
            method: 'POST',
            credentials: 'include'
        });

    }

    useEffect(async function () {
        const res = await fetch('http://localhost:3001/photos/' + props.id);
        const data = await res.json();
        setPostDetails(data);
    }, []);

    return (
        <Card className={classes.root} style={{backgroundColor: "#b5d16d"}}>
            <CardHeader
                title={postDetails.name}
                subheader={postDetails.user}
            />
            <CardMedia
                className={classes.media}
                image={"http://localhost:3001/"+postDetails.path}
                title={postDetails.name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Date: {postDetails.date}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   Votes: {  postDetails.numVotes == null ? 0 : postDetails.numVotes}
                </Typography>
            </CardContent>
            {
                userState.loggedIn && [
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={upvotePost}>
                            <ArrowUpwardIcon />
                        </IconButton>
                        <IconButton aria-label="share" onClick={reportPost}>
                            <ReportIcon />
                        </IconButton>
                    </CardActions>
                ]
            }

        </Card>
    );
}