import React, { Component } from 'react';
import { InputField, LogInContainer, LogoImg, Button } from './styled-components/Styling'

class LogIn extends Component {
    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="" />

                <LogInContainer>
                    <InputField placeholder="username" />
                    <InputField placeholder="password" />
                    <Button>Log In</Button>
                </LogInContainer>
            </div>
        );
    }
}

export default LogIn;