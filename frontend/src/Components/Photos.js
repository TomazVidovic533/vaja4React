import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
        overflow: 'overlay'
    },
    gridList: {
        width: "280em",
        height: "100%",
        overflow: 'overlay'
    },
}));
export default function Photos(props) {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <GridList cellHeight={500} className={classes.gridList} cols={3}>
                {props.photos.map((photo) => (
                    <GridListTile key={photo.img} cols={photo.cols || 1}>
                        <Button onClick={(()=>history.push("/post-detail/"+photo._id))}>
                            <img src={"http://localhost:3001/"+photo.path} alt={photo.name}/>
                        </Button>

                        <GridListTileBar
                            title={photo.name}
                            subtitle={[<span>{photo.user}</span>,<br/>,
                                <span>{photo.date}</span>]}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}
