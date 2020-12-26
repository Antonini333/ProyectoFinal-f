import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { POSTS } from '../../Redux/types';
import { Scrollbars } from 'rc-scrollbars'
import './Homepage.scss';


const Homepage = ({ dispatch, user }) => {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const options = { headers: { Authorization: `Bearer ${user.token}` } };
        axios.get('http://localhost:3000/readallposts', options)

            .then((res)=>{
                setPosts(res.data)
            })
            .catch(error => console.log(error))

    }, []);



    const submitPost = async (event) => {   
        event.preventDefault();


            const newPost = {
                text: event.target.text.value,
                postedBy: user._id,
            };
            const options = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:3000/post', newPost, options);
            await axios.get('http://localhost:3000/readallposts', options)
            .then((res) =>{
                console.log(res.data)
                setPosts(res.data);
              }).catch((error) =>{
                console.log(error);
              })
            }

            const makeComment = (text,_id)=>{
                axios('http://localhost:3000/commentpost/' + _id
                ,{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${user.token}`
                    },
                    data: JSON.stringify({

                        text: text
                    })
                })
                .then(result=>{
                    console.log(result)
                    const newPost = posts.map(post=>{
                      if(post._id===result._id){
                          return result
                      }else{
                          return post
                      }
                   })
                  setPosts(newPost)
                }).catch(err=>{
                    console.log(err)
                })
          }
      
 
    const submitLike = async (_id) => {
        try{
            const options = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put('http://localhost:3000/likepost/' + _id, options);
            await axios.get('http://localhost:3000/readallposts', options)
        }catch {}
        
    }


    return (
        <div className='homepage'>
            <div className='mainContainer'>

                <div className='profile'>
                    <div className="headerProfile"><h2>My Profile</h2></div>
                    <div className='photoProfile'></div>
                    <div className='infoProfile'><h4><div>Name: {user.name}</div><div>Surname: {user.surname}</div><div>Age: {user.age}</div><div>Address:{user.address}</div><div>Bio:{user.bio}</div></h4></div>
                </div>

                <div className='TLContainer'>
                    <div className="header"><h2>What are people talking about?</h2></div>
                    <Scrollbars style={{ width: 1000, height: 450 }}>
                        <div className="posts">
                            {posts?.map(post =>
                                <div className="cardPost" key={post._id}>
                                    <div className="cardPostHeader">Posted by: <b>{post.postedBy}</b></div>
                                    <div className="cardPostText">{post.text}</div>
                                    <div className="inputBox">
                                    <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,post._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                        
                                        {/* <form onSubmit ={commentPost(post._id)}>

                                            <textarea className="inputComment" type="text" name="text2" placeholder="Share your opinion"></textarea>
                                            <button type="submit" className="commentButton">Comment ({post.commentCount})</button>

                                            <button type="button" className="likeButton" onClick={() => {submitLike(post._id)}} >Like ({post.likeCount})</button>
                                        </form> */}
                                    </div>

                                </div>)}
                        </div>
                    </Scrollbars>
                    <div className="newPostBox">
                        <form onSubmit={submitPost}>

                            <textarea className="newPost" type="text" name='text' placeholder="And you? What you're thinking about?"></textarea>
                            <button type="submit" className="newPostButton"><h3>Share your wisdom</h3></button>

                        </form>
                    </div>

                </div>
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

