import React, {Component} from 'react';
import DetailPostCard from '../Components/DetailPostCard';
import PostComments from '../Components/PostComments';
import Container from '@material-ui/core/Container';

export default class PostDetails extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isFetching: null,
        post: null
    }

    async componentDidMount() {
        this.setState({isFetching: true});
        const response = await fetch('http://localhost:3001/photos/' + this.props.match.params.postId);
        const data = await response.json();
        this.setState({post: data});
        console.log(this.state.post)
        console.log("aaaa"+data)
        this.setState({isFetching: false});
    }

    render() {
        return (
            <>
                <Container maxWidth="lg" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{marginTop: "2em", fontFamily: "Goblin One, cursive"}}>
                       <DetailPostCard id={this.props.match.params.postId}/>
                       <PostComments id={this.props.match.params.postId}/>
                    </div>
                </Container>
            </>
        );
    }

}