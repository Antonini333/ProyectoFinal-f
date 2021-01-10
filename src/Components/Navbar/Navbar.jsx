


import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.scss';

const Navbar = () => {

    const user = useSelector(state => state.user)

    const logout = async (event) => {

        try {
            const options = { headers: { Authorization: `Bearer ${user.token}` } };

            await axios.post('http://localhost:3000/user/logout', options);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>

            <div className='headerNav'>
                <div className='menuCenter'>

                    <div className="logoBox">
                        <img className="imgLogoHeader" src='https://i.imgur.com/CZZQE7o.png' alt="logo"></img>
                        
                    </div>
                    <Link style={{ textDecoration: 'none' }} to='/homepage'><p>Home 🏠</p></Link>
                    <Link style={{ textDecoration: 'none' }}to='/people'><p>People 👩‍👩‍👦‍👦</p> </Link>

                    {<Link style={{ textDecoration: 'none' }} to='/login' onClick={logout}><p>Logout 👋</p> </Link>}

                </div>



            </div>

        </>
    )

}

export default Navbar;