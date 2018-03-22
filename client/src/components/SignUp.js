import React, { Component } from 'react';
import { LogoImg, CenterColumn, InputField, ButtonContainer, Button, ColumnTitle, StyledLink } from './styled-components/Styling'
import axios from 'axios'

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

    addNewUser = async (event) => {
        try {
            event.preventDefault()
            const payload = {
                firstName: this.state.newUser.firstName,
                lastName: this.state.newUser.lastName,
                phoneNumber: this.state.newUser.phoneNumber,
                emailAddress: this.state.newUser.emailAddress,
                password: this.state.newUser.password
            }
            console.log(payload)
            console.log(this.state.newUser)
            await axios.post('/api/users/', this.state.newUser)
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="supply.com logo" />
                <form onSubmit={this.addNewUser}>
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