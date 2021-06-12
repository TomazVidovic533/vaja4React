import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            fontFamily: "Goblin One, cursive"
        },
    },
}));

function AddComment(props) {
    const classes = useStyles();
    const [content, setContent] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (e) => {
        setOpen(false);
    };

    async function onSubmit(e) {
        e.preventDefault();

        console.log(content+" "+props.id+" "+props.userId)
        const res = await fetch('http://localhost:3001/photos/' + props.postId + '/comment-post/' + props.userId, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"content":content}),
        });
        //http://localhost:3001/photos/609aa8199b590834ec635251/comment-post/60925cb87a14e634a0dda7ed
        setContent("");
        setOpen(false);
       // window.location.reload();
        props.updateComments(res)
    }

    return (

        <div style={{margin: "1em"}}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Comment post
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form className="form-group" onSubmit={onSubmit}>
                    <DialogTitle id="alert-dialog-title">{"Add new post"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TextField id="outlined-primary" label="Comment post..." variant="outlined" onChange={(e)=>{
                                setContent(e.target.value);
                            }}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={onSubmit} variant="contained" color="primary">Upload</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default AddComment;