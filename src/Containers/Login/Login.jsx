import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.scss';
import { connect } from 'react-redux';
import { LOGIN } from '../../Redux/types';


const Login = ({ dispatch }) => {
    const history = useHistory();
    const clickLogin = async (event) => {
        try {
            event.preventDefault();
            const body = {
                email: event.target.email.value,
                password: event.target.password.value
            }
            let res = await axios.post('http://localhost:3000/user/login', body);
            let user = res.data;
            localStorage.setItem("user", JSON.stringify(user)); // Borrar más tarde

            dispatch({ type: LOGIN, payload: res.data })
            history.push('/homepage')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="loginBox">
            <form className="loginBox" onSubmit={clickLogin}>
                <div className="loginText">Iniciar sesión</div>
                <input className="loginEmail" type="email" name="email" placeholder="Correo electrónico"></input>
                <input className="loginPassword" type="password" name="password" placeholder="Contraseña"></input>
            </form>
        </div>

    )
}

export default connect()(Login);