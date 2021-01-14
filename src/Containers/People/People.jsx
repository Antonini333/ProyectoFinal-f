import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { UPDATE_FOLLOW, ALL_USERS } from '../../Redux/types';
import { Scrollbars } from 'rc-scrollbars';
import Swal from 'sweetalert2/src/sweetalert2.js'
import './People.scss';


const People = ({ dispatch, user, users }) => {
    
    useEffect(() => {
        const options = { headers: { Authorization: `Bearer ${user.token}` } };
        axios.get('https://wisdomshare.herokuapp.com/users', options)

            .then(users => dispatch({ type: ALL_USERS, payload: users.data }))
            .catch(error => console.log())

    });

    const followUser = async (_id) => {
 
        if (user._id === _id) {
            Swal.fire({
                showConfirmButton: false,
                timer: 1000,
                icon: 'error',
                text: 'You cannot follow yourself'
            })
            return;
        } else if (user.following.some(item => item.UserId === _id)) {
            Swal.fire({
                showConfirmButton: false,
                icon: 'info',
                timer: 1000,
                text: 'You already followed this user'
            })
            return;       
        }else{       
       await axios('https://wisdomshare.herokuapp.com/user/follow/' + _id
            , {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
        .then(res => {
            dispatch({type: UPDATE_FOLLOW, payload: res.data})
            Swal.fire({
                showConfirmButton: false,
                timer: 2000,
                icon: 'success',
                text: `User followed!`
            })
        }).catch(err => console.log(err))
      
    }}


    return (
        <div className='people'>
            <div className="usersContainer">
                <Scrollbars style={{ width: 1200, height: 425 }}>
                    {users?.map(user =>
                        <div className="userCard" key={user._id}>
                            <div className="userCardPhoto">
                            <img src={user.photo} alt="Their face here"></img>
                            </div>
                            <div className="userCardName"><b>{user.name}  {user.surname},</b></div> &nbsp;
                                    <div className="userCardAge">{user.age}</div>
                            <div className="followBox">

                                <button className="followButton" onClick={() => {followUser(user._id) }} > Follow</button>
                            </div>
                            <div className="userCardBio">{user.bio}</div>
                        </div>)}

                </Scrollbars>
            </div>
        </div>



    )
}

const mapStateToProps = state => {

    return {
        user: state.user,
        posts: state.posts,
        users: state.users
    }
}


export default connect(mapStateToProps)(People);

