import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LogoImg, CenterColumn, InputField, ButtonContainer, Button, ColumnTitle, StyledLink } from './styled-components/Styling'

class SignUp extends Component {
    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="" />
                <form action="">
                    <CenterColumn>
                        <ColumnTitle>Sign Up</ColumnTitle>
                        <InputField placeholder="First Name" required />
                        <InputField placeholder="Last Name" required />
                        <InputField placeholder="E-mail" required />
                        <InputField placeholder="Phone Number" required />
                        <InputField placeholder="Password" required />
                        <InputField placeholder="Confirm Password" required />
                        <ButtonContainer>
                            <Button>Sign Up</Button>
                            <StyledLink to={'/'}><Button>Back to Home</Button></StyledLink>
                        </ButtonContainer>
                    </CenterColumn>
                </form>
            </div>
        );
    }
}

export default SignUp;