import React, { useEffect } from 'react';
import axios from 'axios';
import { connect  } from 'react-redux';
import { POSTS } from '../../Redux/types';
import './Homepage.scss';


const Homepage = ({ dispatch, user, posts}) => {


    useEffect(() => {
        const options = { headers: { Authorization: `Bearer ${user.token}`}};
        axios.get('http://localhost:3000/readallposts', options)
        
            .then(posts => dispatch({ type: POSTS, payload: posts.data }))
            .catch(error => console.log())

    }, [])

    return (
        <div className='profileView'>
            <div className="allPosts">
                <div className="titleMain"><h2>MAIN POSTS</h2></div>
                
            </div>
            <div className="posts">
                {posts?.map(post =>
                    <div className="cardOrder" key={post._id}>
                        <div className="titleCard">{post.post}</div>
                        
                        
                    </div>)}

            </div>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        user: state.user,
        posts: state.posts
    }
}


export default connect(mapStateToProps)(Homepage);

