import React from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './Register.scss';
import { Input } from 'antd';


const Register = () => {

    const clickRegister = async (event) => {
        event.preventDefault();
        try {
            const body = {
                name: event.target.name.value,
                surname: event.target.surname.value,
                email: event.target.email.value,
                password: event.target.password.value,
                age: event.target.age.value,
                address: event.target.address.value
            }
            let res = await axios.post('https://frozen-falls-26970.herokuapp.com/user/register', body);
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
             <div className="titleRegister"><h2>You're close to WisdomShare</h2>¡Sign Up!</div>
            <form className="registerForm" onSubmit={clickRegister}>
                <Input className="inputText" type="name" name="name" placeholder="Name"/>
                <Input className="inputText" type="surname" name="surname" placeholder="Surname"/>
                <Input className="inputText" type="email" name="email" placeholder="Email"/>
                <Input className="inputText" type="password" name="password" placeholder="Password"/>
                <Input className="inputText" type="age" name="age" placeholder="Age"/>
                <Input className="inputText" type="address" name="address" placeholder="Address"/>
                <button className="buttonRegister" type="submit"><h3>Sign up</h3></button>
            </form>
            <div className="alreadyRegistered">¿Already registered? 
            <Link className="linkToLogin"to='/login'><b>¡Sign In!</b></Link></div>
        </div>
        <div></div>
        </div>

    )
}

export default Register;