import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Register.scss';


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
        <div className="registerBox">
            <form className="registerForm" onSubmit={clickRegister}>
                <input className="loginName" type="name" name="name" placeholder="Nombre"></input>
                <input className="loginSurname" type="surname" name="surname" placeholder="Apellidos"></input>
                <input className="loginEmail" type="email" name="email" placeholder="Correo electrónico"></input>
                <input className="loginPassword" type="password" name="password" placeholder="Contraseña"></input>
                <input className="loginAge" type="age" name="age" placeholder="Edad"></input>
                <input className="loginAddress" type="address" name="address" placeholder="Dirección"></input>
                <button className="buttonlogin" type="submit">Register</button>
            </form>
        </div>

    )
}

export default Register;