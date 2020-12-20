import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
    return (
        <>
        <Nav>
            <NavLink to="/">
                <h1>Logo</h1>
            </NavLink>
            <Bars />
            <NavMenu>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/services" activeStyle>
                    Services
                </NavLink>
                <NavLink to="/people" activeStyle>
                    People
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NabBtnLink to="/login">Logout</NabBtnLink>
            </NavBtn>
        </Nav>
        </>
    )
}

export default Navbar
