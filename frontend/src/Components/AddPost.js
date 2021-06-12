import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useHistory} from "react-router-dom";
import {UserContext} from "../Helpers/Context";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            fontFamily: "Goblin One, cursive",
        },
    },
}));

function AddPost(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const {userState, setUserState} = useContext(UserContext);
    const history = useHistory();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (e) => {
        setOpen(false);
    };

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('slika', file);
        formData.append('userId', userState.id);

        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();
        setName("");
        setFile("");
        setOpen(false);
       // window.location.reload();
        props.updatePhotos(data)
    }

    return (

        <div style={{margin: "1em"}}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add post
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
                            <TextField id="outlined-primary" label="Title" variant="outlined" onChange={(e)=>{
                                setName(e.target.value);
                            }}/>
                            <Button style={{margin: "0.5em"}} variant="contained" component="label">
                                Choose File
                                <input type="file" hidden onChange={(e) => {
                                    setFile(e.target.files[0])
                                }}/>
                            </Button>
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

export default AddPost;