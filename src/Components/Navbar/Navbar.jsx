import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.scss';

const Navbar = ({user}) => {

    const logout = async (event) => {

        try {
            const options = { headers: { Authorization: `Bearer ${user.token}` } };

            await axios.put('https://wisdomshare.herokuapp.com/user/logout', options);
        } catch (error) {
            console.log(error);
        }
    };


    

    return (
        <>

            <div className='headerNav'>
                <div className='menuCenter'>

                    <div className="logoBox">
                        <img className="imgLogoHeader" src='https://i.imgur.com/3eiP67E.png' alt="logo"></img>
                        
                    </div>
                    <Link style={{ textDecoration: 'none' }} to='/homepage'><p>Home 🏠</p></Link>
                    <Link style={{ textDecoration: 'none' }}to='/people'><p>People 👩‍👩‍👦‍👦</p> </Link>

                    {<Link style={{ textDecoration: 'none' }} to='/login' onClick={logout}><p>Logout 👋</p> </Link>}

                </div>



            </div>

        </>
    )

}

const mapStateToProps = state => {

    return {
        user: state.user,
    }
}


export default connect(mapStateToProps)(Navbar);