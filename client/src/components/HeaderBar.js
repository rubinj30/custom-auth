import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Button, LogoImg } from './styled-components/Styling'

class HeaderBar extends Component {

    logOut = () => {
        localStorage.clear()
    }

    render() {
        return (
            <HeaderDiv>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="supply.com logo" />
                <Link to={'/'}><Button onClick={this.logOut}>Log Out</Button></Link>
            </HeaderDiv>
        );
    }
}

export default HeaderBar;

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 15px;
    align-items: center;
`