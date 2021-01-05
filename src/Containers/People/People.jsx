import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { ALL_USERS } from '../../Redux/types';
import { Scrollbars } from 'rc-scrollbars';
import { message } from 'antd';
 import './People.scss';


const People = ({ dispatch, user, users }) => {

    const success = 
        message.success('User followed')


    useEffect(() => {
        const options = { headers: { Authorization: `Bearer ${user.token}` } };
        axios.get('http://localhost:3000/users', options)

            .then(users => dispatch({ type: ALL_USERS, payload: users.data }))
            .catch(error => console.log())

    }, []);

    const followUser = (_id) => {
        axios('http://localhost:3000/user/follow/' + _id
            , {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            axios.get('http://localhost:3000/users')

            .then(result => {
                console.log(result)
                success();
            }).catch(err => {
                console.log(err)
            })

            
    }


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

                                <button className="followButton" onClick={() => { followUser(user._id) }} > Follow</button>
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

