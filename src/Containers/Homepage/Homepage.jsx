import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { POSTS } from '../../Redux/types';
import { Scrollbars } from 'rc-scrollbars'
import './Homepage.scss';


const Homepage = ({ dispatch, user, posts }) => {
    console.log(user)


    useEffect(() => {
        const options = { headers: { Authorization: `Bearer ${user.token}` } };
        axios.get('http://localhost:3000/readallposts', options)

            .then(posts => dispatch({ type: POSTS, payload: posts.data }))
            .catch(error => console.log())

    }, [])

    const handleSubmit = async (event) =>{
        try{
        event.preventDefault(); // Prevent the page from refreshing.
        
        const newPost={
            text: event.target.text.value,
            postedBy: user._id,    
        };
        const options = { headers: { Authorization: `Bearer ${user.token}` } };
        axios.post('http://localhost:3000/post', newPost, options)
        
        }catch{
         console.log('Falla');
    }  
}

    return (
        <div className='homepage'>
            <div className='mainContainer'>

                <div className='profile'><h2>Your profile</h2></div>

                <div className='TLContainer'>
                    <div className="header"><h2>What are people talking about?</h2></div>
                    <Scrollbars style={{ width: 600, height: 400 }}>
                        <div className="posts">
                            {posts?.map(post =>
                                <div className="cardPost" key={post._id}>
                                    <div className="cardPostHeader">Escrito por: <b>{post.postedBy}</b></div>
                                    <div className="cardPostText">{post.text}</div>
                                    <form>
                                    <div className="inputBox">
                                        <textarea className="inputComment" type="textarea" name="comment" placeholder="Escribe algo..."></textarea>
                                        <div className="buttonBox">
                                            <button type="submit" className="likeButton">Like</button>
                                            <button type="submit" className="sendButton">Comment</button>
                                        </div>
                                    </div>
                                    </form>
                                </div>)}
                        </div>
                    </Scrollbars>
                    <form onSubmit={handleSubmit}>       
                                    <div className="newPostBox">
                    <textarea className="newPost" type="textarea" name="newPost" placeholder="¿En qué piensas?"></textarea>
                    <button type="submit" className="newPostButton">Comparte</button>
                    </div>
                    </form>

                </div>

                <div className="calendar"><h2>Friends/Calendar</h2></div>
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

