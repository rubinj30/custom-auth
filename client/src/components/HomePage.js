import React, { Component } from 'react';
import { LogoImg, Button, CenterColumn, ButtonContainer, StyledLink, Column  } from './styled-components/Styling'

class HomePage extends Component {
    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="supply.com logo" />
                <CenterColumn>
                    <ButtonContainer>
                        <StyledLink to={'/login'}><Button>Log In</Button></StyledLink>
                        <StyledLink to={'/signup'}><Button>Register</Button></StyledLink>
                    </ButtonContainer>
                </CenterColumn>
            </div>
        );
    }
}

export default HomePage;