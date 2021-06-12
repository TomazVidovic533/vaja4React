import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import AddComment from "./AddComment";
import {UserContext} from "../Helpers/Context";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "2em",
        width: '100%',
        maxWidth: '50 em',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function AlignItemsList(props) {
    const classes = useStyles();
    const {userState, setUserState} = useContext(UserContext);
    const [comments, setComments] = useState([]);

    async function updateComments(comment){
        const c=(<>
            <ListItem alignItems="flex-start" style={{backgroundColor: "#b5d16d"}}>
                <ListItemText
                    primary={comment.date}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {comment.user}
                            </Typography>
                            {comment.content}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </>);
        setComments({...comments, c})
        //setComments([...comments, c])
    }

    useEffect(async function () {
        const res = await fetch('http://localhost:3001/photos/get-comments/' + props.id);
        const data = await res.json();
        const comments = data.map(comment => (
            <>
                <ListItem alignItems="flex-start" style={{backgroundColor: "#b5d16d"}}>
                    <ListItemText
                        primary={comment.date}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {comment.user}
                                </Typography>
                                {comment.content}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
            </>
        ));
        setComments({comments});
    }, []);

    return (
        <List className={classes.root}>
            { userState.loggedIn && <AddComment updateComments={updateComments} postId={props.id} userId={userState.id}/> }
            {comments.comments}
        </List>
    );
}
