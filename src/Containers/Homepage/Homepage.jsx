import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { POSTS } from '../../Redux/types';
import { Scrollbars } from 'rc-scrollbars';
import './Homepage.scss';


const Homepage = ({ dispatch, user }) => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [value, setValue] = useState('');  // Para borrar los inputs una vez se ha producido el submit
    const [api, setApi] = useState('https://wisdomshare.herokuapp.com/readallposts');
    const imAdmin = user?.role === 'admin';

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [callback, delay]);

    }

    useInterval(async (event) => {
        let res = await axios.get(api)
        setPosts(res.data)

        dispatch({ type: POSTS, payload: res.data })
    }, 2000)



    const submitPost = async (event) => {
        try {
            event.preventDefault();
            const options = { headers: { Authorization: `Bearer ${user.token}` } };
            const newPost = {
                text: value,
                categorie: event.target.categorie.value,
                postedBy: user._id
            };
            let res = await axios.post('https://wisdomshare.herokuapp.com/post', newPost, options);
            setValue('');
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }

    const makeComment = (text, _id) => {
        axios('https://wisdomshare.herokuapp.com/commentpost/' + _id
            , {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                data: JSON.stringify({

                    text: value
                })
            })
            .then(result => {
                console.log(result)
                const newPost = posts.map(post => {
                    if (post._id === result._id) {
                        return result
                    } else {
                        return post
                    }
                })
                setPosts(newPost)
                setValue('');

            }).catch(err => {
                console.log(err)
            })
    }


    const submitLike = (_id) => {
        axios('https://wisdomshare.herokuapp.com/likepost/' + _id
            , {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            .then(result => {
                console.log(result)
                const newPost = posts.map(post => {
                    if (post._id === result._id) {
                        return result
                    } else {
                        return post
                    }
                })
                setPosts(newPost)

            }).catch(err => {
                console.log(err)
            })
    }

    let handleClick =(e) => {
        e.preventDefault();
        history.push('/update')
    }

    const deletePost = (_id) => {
        axios('https://wisdomshare.herokuapp.com/deletepost/' + _id
            , {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            .then(result => {
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
    }
    


    return (
        <div className='homepage'>
            <div className='mainContainer'>

                <div className='profile'>
                    <div className="headerProfile"><h2>My Profile</h2></div>
                    <div className='photoProfile'>
                        <img src={user.photo} alt="Your face here"></img></div>
                    <div className='infoProfile'><h4><div>{user.name}&nbsp;{user.surname}</div><div>Age: {user.age}</div><div>{user.address}</div></h4><div>"{user.bio}"</div></div>
                   <div className="buttonUpdateBox"> <button className="buttonUpdate" onClick={handleClick}><h3>Update your profile</h3></button></div>
                   <div className="followCount"><b>{user.followCount}</b> &nbsp;followers</div>
                </div>

                <div className='TLContainer'>
                    <div className="header"><h2>What are people talking about?</h2></div>
                    <div className="categoryBox">
                    <select className= "selectCategory" onClick={(e) => setApi(e.target.value)}>
                        <option selected type='category' name='category' value="https://wisdomshare.herokuapp.com/readallposts"  >All Posts</option>
                        <option type='category' name='category' value="https://wisdomshare.herokuapp.com/readlifestyleposts" >Lifestyle</option>
                        <option type='category' name='category' value="https://wisdomshare.herokuapp.com/readparentingposts">Parenting</option>
                        <option type='category' name='category' value="https://wisdomshare.herokuapp.com/readnewsposts">News</option>
                        <option type='category' name='category' value="https://wisdomshare.herokuapp.com/readtechposts">Techology</option>
                        <option type='category' name='category' value="https://wisdomshare.herokuapp.com/readcookingposts">Cooking</option>
                    </select>
                    </div>
                    <Scrollbars style={{ width: 1000, height: 600 }}>
                        <div className="posts">
                            {posts?.map(post =>
                                <div className="cardPost" key={post._id}>
                                    <div className="cardPostHeader"><h3>Posted at <em>{post.categorie}</em> by:</h3>  <b>{post.name} {post.surname} </b>{post.likeCount} Wisdom Points</div>
                                    <div className="deleteBox">
                                    {imAdmin && <button type="button" className="deleteButton" onClick={() => { deletePost(post._id) }} >Delete Post</button>}
                                    </div>
                                    <div className="cardPostText">{post.text}</div>
                                    <div className="cardCommentHeader"><h4>Leave your comment</h4></div>
                                    <div className="cardPostComment">{post.comments.map(comment =>
                                        <div className="cardMapComment" key={comment._id}>
                                            <div className="cardCommentText"><b>{comment.name} {comment.surname}</b> commented: <em>"{comment.text}"</em></div></div>)}</div>

                                    <div className="inputBox">
                                        <div className="likeBox">

                                            <button type="button" className="likeButton" onClick={() => { submitLike(post._id) }} ><b>+1 WP</b></button>
                                        </div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            makeComment(e.target[0].value, post._id)
                                        }}>
                                            <input onChange={event => setValue(event.target.value)} className="inputComment" type="text" placeholder="Hit enter to add a comment " />

                                        </form>


                                    </div>

                                </div>)}
                        </div>
                    </Scrollbars>
                    <div className="newPostBox">
                        <form onSubmit={submitPost} >

                            <textarea onChange={event => setValue(event.target.value)} className="newPost" type="text" name='text' placeholder="And you? What you're thinking about?"></textarea>

                            <select className="newPostChoose" type="categorie" name="categorie">
                            <option key={-1} selected disabled>Select your post category</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Parenting">Parenting</option>
                                <option value="News">News</option>
                                <option value="Technology">Techology</option>
                                <option value="Cooking">Cooking</option>
                            </select>
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

