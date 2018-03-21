import React, { Component } from 'react';
import { LogoImg, CenterColumn, InputField, ButtonContainer, Button } from './styled-components/Styling'

class SignUp extends Component {
    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="" />
                <CenterColumn>
                    <InputField placeholder="First Name"/>
                    <InputField placeholder="Last Name"/>
                    <InputField placeholder="E-mail"/>
                    <InputField placeholder="Phone Number"/>
                    <InputField placeholder="Password"/>
                    <InputField placeholder="Confirm Password"/>
                    <ButtonContainer>
                        <Button>Sign Up</Button>
                        <Button>Back to Home</Button>
                    </ButtonContainer>
                </CenterColumn>
            </div>
        );
    }
}

export default SignUp;