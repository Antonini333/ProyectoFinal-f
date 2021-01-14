import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Input } from 'antd';
import { connect } from 'react-redux';
import { LOGIN } from '../../Redux/types';


const Login = ({ dispatch }) => {
    const history = useHistory();
    const clickLogin = async (event) => {
        event.preventDefault();
            
            const body = {
                email: event.target.email.value,
                password: event.target.password.value
            }
            await axios.post('https://wisdomshare.herokuapp.com/user/login', body)
            .then(res => {
                dispatch({ type: LOGIN, payload: res.data })
                Swal.fire({
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'success',
                    title: `Welcome back, ${res.data.name}!`,
                    text: `It's nice to see you again 🤗 `
                })

                setTimeout(() => {
                    history.push('/homepage')
                }, 1500)
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: 'Wrong credentials'
                })
            });
    }

    return (
        <div className="mainlogin">
            <div></div>
        <div className="loginBox">
             <div className="titleLogin"><h2>Welcome to WisdomShare</h2>
            <div><h3> For the sake of learn</h3></div>
             <div><h3> For the sake of care</h3></div>
             ¡Share your wisdom!</div>
            <form className="registerForm" onSubmit={clickLogin}>
                <Input className="inputLogin" type="email" name="email" placeholder="Correo electrónico"/>
                <Input className="inputLogin" type="password" name="password" placeholder="Contraseña"/>

                <button className="buttonLogin" type="submit"><h3>Let's start!</h3></button>
            </form>
        </div>
        <div></div>
        </div>

    )
}


export default connect()(Login);