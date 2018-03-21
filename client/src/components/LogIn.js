import React, { Component } from 'react';
import { InputField, CenterColumn, LogoImg, Button, ButtonContainer } from './styled-components/Styling'

class LogIn extends Component {
    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="" />

                <CenterColumn>
                    <InputField placeholder="username" />
                    <InputField placeholder="password" />
                    <ButtonContainer>
                        <Button>Log In</Button>
                        <Button>Back to Home</Button>
                    </ButtonContainer>
                </CenterColumn>
            </div>
                    );
                }
            }
            
export default LogIn;