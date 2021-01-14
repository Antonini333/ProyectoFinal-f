import React, { useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2/src/sweetalert2.js'
import spinner from '../../spinner.svg'
import './Register.scss';
import { Input } from 'antd';






const Register = () => {

    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const regExName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    const regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    const regExEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

    const clickRegister = async (event) => {
        event.preventDefault();
       
            const body = {
                name: event.target.name.value,
                surname: event.target.surname.value,
                email: event.target.email.value,
                password: event.target.password.value,
                age: event.target.age.value,
                address: event.target.address.value,
                bio: event.target.bio.value,
            }

            if (!regExName.test(body.name)) {
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1000,
                    icon: 'error',
                    text: 'Name cannot contain numbers'
                })
                return;
            } else if (!regExName.test(body.surname)) {
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1000,
                    icon: 'error',
                    text: 'Surname cannot contain numbers'
                })
                return;
            } else if (!regExEmail.test(body.email)) {
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1000,
                    icon: 'error',
                    text: 'E-mail format: "example@example.com"'
                })
                return;
            } else if (!regExPass.test(body.password)) {
                Swal.fire({
                    showConfirmButton: false,
                    timer: 3500,
                    icon: 'error',
                    text: 'Password must be at least 8 characters, must contain uppercases, lowercases, numbers and at least one special character'
                })
                return;
                }
    
            setIsLoading(true);
            
            await axios.post('https://wisdomshare.herokuapp.com/user/register', body)
            .then(() => {
                setIsLoading(false);
                Swal.fire({
                    showConfirmButton: false,
                    timer: 2000,
                    icon: 'success',
                    text: `Welcome on board ${body.name}!`
                })
                setTimeout(() => {
                    history.push('/login')
                }, 1500)
            }).catch(() => {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    text: 'You are already registered'
                })
            });
    }


    return (
        <div className="mainregister">
            <div></div>
        <div className="registerBox">
             <div className="titleRegister"><h2>You're close to WisdomShare</h2>¡Sign Up!</div>
            
                {isLoading
                        ?
                        <div className="spinner">
                            <img src={spinner} alt="loading" />
                        </div>
                        :
                        <form className="registerForm" onSubmit={clickRegister}>
                <Input required className="inputText" type="name" name="name" placeholder="Name"/>
                <Input required className="inputText" type="surname" name="surname" placeholder="Surname"/>
                <Input required className="inputText" type="email" name="email" placeholder="Email"/>
                <Input required className="inputText" type="password" name="password" placeholder="Password"/>
                <Input className="inputText" type="age" name="age" placeholder="Age"/>
                <Input className="inputText" type="address" name="address" placeholder="City, Country"/>
                <Input className="inputText" type="bio" name="bio" placeholder="Tell something about you"/>
                <button className="buttonRegister" type="submit"><h3>Sign up</h3></button>
                </form>
                    }
            
            <div className="alreadyRegistered">¿Already registered? 
            <Link className="linkToLogin"to='/login'><b>¡Sign In!</b></Link></div>
        </div>
        <div></div>
        </div>

    )
}

export default Register;