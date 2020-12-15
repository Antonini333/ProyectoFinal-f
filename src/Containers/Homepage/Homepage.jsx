import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CALL_POSTS } from '../../Redux/types';
import './Homepage.scss';


const Homepage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    console.log(user)
    const posts = useSelector(state => state.posts)
    

    useEffect(() => {
        const options = { headers: { Authorization: `Bearer ${user.token}`}};
        axios.get('http://localhost:3000/readallposts', options)
        
            .then(posts => dispatch({ type: CALL_POSTS, payload: posts.data }))
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


export default Homepage;

