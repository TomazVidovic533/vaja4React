import {useState, useEffect, useMemo, useContext} from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Photos from './Components/Photos';
import AddPost from './Components/AddPost';
import Header from './Components/Header';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PostDetails from "./Pages/PostDetails";
import Posts from "./Pages/Posts";
import Home from "./Pages/Home";
import {User, UserContext} from "./Helpers/Context";
import Profile from "./Pages/Profile";


function App() {

    const [userState, setUserState] = useState({});
    const [photos, setPhotos] = useState([]);
    const [photosHot, setHotPhotos] = useState([]);
    const [showAddPhoto, setShowAddPhoto] = useState(false);

    useEffect(function () {
        const getPhotos = async function () {
            const res = await fetch('http://localhost:3001/photos');
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();

        const getHotPhotos = async function () {
            const res = await fetch('http://localhost:3001/photos/hot');
            const data = await res.json();
            setHotPhotos(data);
        }
        getHotPhotos();
        if(userState.loggedIn){
            setUserState({loggedIn:true, username:sessionStorage.getItem('username'),id:sessionStorage.getItem('id')});
        }
    }, []);

    function updatePhotos(data){
         setPhotos([ data,...photos])
         setHotPhotos([...photosHot, data])
    }

    async function addPhoto(task) {
        const formData = new FormData();
        formData.append('name', task.name);
        formData.append('slika', task.file);

        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();
        console.log(data)
        setPhotos([...photos, data]);
    }

    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <UserContext.Provider value={{userState, setUserState}}>
                <Header/>

            <div className='container' style={{fontFamily: "Goblin One, cursive"}}>
                <Route path='/home' exact>
                    <Home photosState={updatePhotos} photos={photosHot}/>
                </Route>
                <Route path='/posts' exact>
                   <Posts photosState={updatePhotos} photos={photos}/>
                </Route>
                <Route
                    exact
                    path={"/post-detail/:postId"}
                    render={props => (
                        <PostDetails
                            {...props}
                        />
                    )}
                />
                <Route
                    exact
                    path={"/sign-in"}
                    render={(props) => (
                        <SignIn
                            {...props}
                        />
                    )}
                />
                <Route
                    exact
                    path={"/sign-up"}
                    render={props => (
                        <SignUp
                            {...props}
                        />
                    )}
                />
                <Route
                    exact
                    path={"/profile/:id"}
                    render={props => (
                        <Profile
                            {...props}
                        />
                    )}
                />
            </div>
            </UserContext.Provider>
        </BrowserRouter>
            </ThemeProvider>
    );
}

export default App;
