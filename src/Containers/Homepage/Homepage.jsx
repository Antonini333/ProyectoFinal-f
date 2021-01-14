import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { POSTS } from '../../Redux/types';
import { Scrollbars } from 'rc-scrollbars';
import Swal from 'sweetalert2/src/sweetalert2.js'
import spinner from '../../spinner.svg'
import './Homepage.scss';


const Homepage = ({ dispatch, user }) => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = useState('');
    const [api, setApi] = useState('http://localhost:3000/readallposts');
    const [comment, setComment] = useState('');
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
        setIsLoading(false)

        dispatch({ type: POSTS, payload: res.data })
    }, 4000)



    const submitPost = async (event) => {
        try {
            event.preventDefault();
            const options = { headers: { Authorization: `Bearer ${user.token}` } };
            const newPost = {
                text: value,
                categorie: event.target.categorie.value,
                postedBy: user._id
            };
            if (event.target.categorie.value === "null") {
                Swal.fire({
                    showConfirmButton: true,
                    icon: 'error',
                    text: 'You must choose a categorie for your post'
                })
                return;
            } else {
                await axios.post('http://localhost:3000/post', newPost, options);
                setValue('');
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const makeComment = (text, _id) => {

        axios('http://localhost:3000/commentpost/' + _id
            , {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                data: JSON.stringify({

                    text: comment
                })

            })
            .then(result => {

                const newPost = posts.map(post => {
                    if (post._id === result._id) {
                        return result
                    } else {
                        return post
                    }
                })
                setPosts(newPost)
                setComment('')

            }).catch(err => {
                console.log(err)
            })
    }


    const submitLike = (_id) => {

        axios('http://localhost:3000/likepost/' + _id
            , {
                method: "put",
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


    let handleClick = (e) => {
        e.preventDefault();
        history.push('/update')
    }

    const deletePost = (_id) => {
        axios('http://localhost:3000/deletepost/' + _id
            , {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
    }



    return (
        <div className='homepage'>
            <div className='mainContainer'>

                <div className='profile'>
                    <div className="headerProfile"><h3>My Profile</h3></div>
                    <div className='photoProfile'>
                        <img src={user.photo} alt="Your face here"></img></div>
                    <div className='infoProfile'><h4><div>{user.name}&nbsp;{user.surname}</div><div>Age: {user.age}</div><div>{user.address}</div></h4><div>"{user.bio}"</div></div>
                    <div className="buttonUpdateBox"> <button className="buttonUpdate" onClick={handleClick}><h3>Update your profile</h3></button></div>
                    <div className="followCount"><b>{user.followCount}</b> &nbsp;followers</div>
                </div>



                <div className='TLContainer'>
                    <div className="header"><h3>What are people talking about?</h3></div>
                    <div className="categoryBox">
                        <select className="selectCategory" onClick={(e) => {
                            setApi(e.target.value)
                            setIsLoading(true)
                        }} >
                            <option selected type='category' name='category' value="http://localhost:3000/readallposts"  >All Posts</option>
                            <option type='category' name='category' value="http://localhost:3000/readlifestyleposts" >Lifestyle</option>
                            <option type='category' name='category' value="http://localhost:3000/readparentingposts">Parenting</option>
                            <option type='category' name='category' value="http://localhost:3000/readnewsposts">News</option>
                            <option type='category' name='category' value="http://localhost:3000/readtechposts">Techology</option>
                            <option type='category' name='category' value="http://localhost:3000/readcookingposts">Cooking</option>
                        </select>
                    </div>


                    <Scrollbars style={{ width: 1000, height: 600 }}>
                        {isLoading
                            ?
                            <div className="spinnerhomepage">
                                <img src={spinner} alt="loading" />
                            </div>
                            :
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
                                                setComment(e.target.value)
                                                makeComment(comment, post._id)
                                            }} >

                                                <input className="inputComment" onChange={event => setComment(event.target.value)} value={comment} placeholder="Hit enter to add a comment"></input>

                                            </form>




                                        </div>

                                    </div>)}
                            </div>}
                    </Scrollbars>
                    <div className="newPostBox">
                        <form onSubmit={submitPost} >

                            <textarea onChange={event => setValue(event.target.value)} value={value} className="newPost" type="text" name='text' placeholder="And you? What you're thinking about?"></textarea>

                            <select className="newPostChoose" type="categorie" name="categorie">
                                <option key={-1} value="null" selected disabled>Select your post category</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Parenting">Parenting</option>
                                <option value="News">News</option>
                                <option value="Technology">Technology</option>
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

