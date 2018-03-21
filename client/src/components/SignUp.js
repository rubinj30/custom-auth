import React, { Component } from 'react';
import { LogoImg, CenterColumn, InputField, ButtonContainer, Button, ColumnTitle, StyledLink } from './styled-components/Styling'

class SignUp extends Component {
    state = {
        newUser: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        const attributeName = event.target.name
        const attributeValue = event.target.value
        const newUser = { ...this.state.newUser }
        newUser[attributeName] = attributeValue
        this.setState({ newUser })
    }

    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="supply.com logo" />
                <form action="">
                    <CenterColumn>
                        <ColumnTitle>Sign Up</ColumnTitle>
                        <InputField onChange={this.handleChange} 
                            placeholder="First Name" name="firstName" required />
                        <InputField onChange={this.handleChange} 
                            placeholder="Last Name" name="lastName" required />
                        <InputField onChange={this.handleChange} 
                            placeholder="E-mail" name="emailAddress" required />
                        <InputField onChange={this.handleChange} 
                            placeholder="Phone Number" name="phoneNumber" required />
                        <InputField onChange={this.handleChange} 
                            placeholder="Password" name="password" type="password" required />
                        <InputField onChange={this.handleChange} 
                            placeholder="Confirm Password" name="confirmPassword" type="password" required />
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