import React from 'react';
import styled from 'styled-components';
import MmmBurger from './MmmBurger';

const Nav = styled.nav`
    width: 100%
    height: 55px;
    border-bottom: 2px solid #f1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    .logo {
        padding: 15px 0; 
    }
`
const Navbar = () => {
    return (
        <Nav>
            <MmmBurger/>
            <div className='logo'>
                I75 Leagues
            </div>
        </Nav>
    )
}

export default Navbar;