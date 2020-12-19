import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Register.scss';
import { Input } from 'antd';


const Register = () => {

    const clickRegister = async (event) => {
        try {
            event.preventDefault();
            const body = {
                name: event.target.name.value,
                surname: event.target.surname.value,
                email: event.target.email.value,
                password: event.target.password.value,
                age: event.target.age.value,
                address: event.target.address.value
            }
            let res = await axios.post('http://localhost:3000/user/register', body);
            console.log(res.data)

            useHistory.push('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mainregister">
            <div></div>
        <div className="registerBox">
             <div className="titleRegister"><h2>Estás más cerca de WisdomShare</h2>¡Regístrate!</div>
            <form className="registerForm" onSubmit={clickRegister}>
                <Input className="inputText" type="name" name="name" placeholder="Nombre"/>
                <Input className="inputText" type="surname" name="surname" placeholder="Apellidos"/>
                <Input className="inputText" type="email" name="email" placeholder="Correo electrónico"/>
                <Input className="inputText" type="password" name="password" placeholder="Contraseña"/>
                <Input className="inputText" type="age" name="age" placeholder="Edad"/>
                <Input className="inputText" type="address" name="address" placeholder="Dirección"/>
                <button className="buttonRegister" type="submit">Register</button>
            </form>
            <div className="alreadyRegistered">LLA TEREGIS TRASTE ONO??¿??¿</div>
        </div>
        <div></div>
        </div>

    )
}

export default Register;