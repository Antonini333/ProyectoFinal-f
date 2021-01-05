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
                        <img className="imgLogoHeader" src="https://www.clasesdeperiodismo.com/wp-content/uploads/2015/04/ideas.png" alt="logo"></img><h2>WisdomShare</h2>
                    </div>
                    <Link to='/homepage'>Home</Link>
                    <Link to='/people'>People</Link>

                    {<Link to='/' onClick={logout}>Logout</Link>}
                </div>



            </div>

        </>
    )

}

export default Navbar;