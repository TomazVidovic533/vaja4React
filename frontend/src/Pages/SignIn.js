import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect, useHistory} from 'react-router-dom';
import {UserContext} from "../Helpers/Context";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function SignIn(props) {
    const {userState, setUserState} = useContext(UserContext);
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function Login(e) {
        e.preventDefault();

        const data = {username: username, password: password};
        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const d = await res.json();

        sessionStorage.setItem("username",d.username);
        sessionStorage.setItem("email",d.email);
        sessionStorage.setItem("id",d._id);
        console.log(sessionStorage.getItem("username"));
        console.log(sessionStorage.getItem("email"));
        setUserState({loggedIn:true,username:d.username,id:d._id});
        history.push("/home");

        setUsername("");
        setPassword("");
    }

    return (
        <Container component="main" maxWidth="xs" style={{height: "100vh"}}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h1" style={{color:"#a6bd40",fontFamily:"Reggae One, cursive"}}>
                    Sign In
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="text"
                                label="Username"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={Login}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={5}>

            </Box>
        </Container>
    );
}

export default SignIn;