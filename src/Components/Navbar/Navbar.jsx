import React from 'react'
import { Nav, NavLink, NavMenu, Bars, NavBtn, NavBtnLink } from './NavbarElements'


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
                <NavBtnLink to="/login">Logout</NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    )
}

export default Navbar
