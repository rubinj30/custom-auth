import React, { Component } from 'react';
import { InputField, CenterColumn, LogoImg, Button, ButtonContainer, ColumnTitle, StyledLink } from './styled-components/Styling'

class LogIn extends Component {
    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="supply.com logo"  />
                <form action="">
                    <CenterColumn>
                        <ColumnTitle>Log In</ColumnTitle>
                        <InputField placeholder="username" required/>
                        <InputField placeholder="password" required/>
                        <ButtonContainer>
                            <Button>Log In</Button>
                            <StyledLink to={'/'}><Button>Back to Home</Button></StyledLink>
                        </ButtonContainer>
                    </CenterColumn>
                </form>
            </div>
        );
    }
}

export default LogIn;