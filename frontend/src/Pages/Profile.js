import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {UserContext} from "../Helpers/Context";
import {useParams} from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "2em",
        marginBottom: "2em",
        maxWidth: "30em",
        minHeight: "20em",
        margin: "0 auto",
        textAlign: "center",
        verticalAlign: "middle"
    },
    media: {
        height: 0,
        width: "20em",
        paddingTop: '57.25%', // 16:9
    },
    data: {
        fontSize:"20px",

    }
}));


export default function Profile(props) {
    const classes = useStyles();
    const {id} = useParams();
    const [userData, setUserData] = useState("");

    useEffect(async function () {
        const res = await fetch('http://localhost:3001/users/' + id);
        const data = await res.json();
        console.log(data)
        setUserData(data)
    }, []);

    return (
        <>
            <Card className={classes.root} style={{backgroundColor: "#b5d16d"}}>
                <CardHeader className={classes.data}
                            title={userData.username}
                    subheader={userData.email}
                />
                <CardContent>
                    <Typography variant="body2" className={classes.data}  color="textSecondary" component="p">
                        Total upvotes: {userData.totalUpvotes}
                    </Typography>
                    <Typography variant="body2" className={classes.data} color="textSecondary" component="p">
                        Number of posts: {userData.numOfPosts}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}