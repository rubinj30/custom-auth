import React, { Component } from 'react';
import { LogoImg, CenterColumn, InputField, ButtonContainer, Button, ColumnTitle, StyledLink } from './styled-components/Styling'
import axios from 'axios'
import swal from 'sweetalert'
const R = require('ramda');

class SignUp extends Component {
    state = {
        newUser: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        },
        userEmailAddresses: []
    }

    componentWillMount = () => {
        this.getAllExistingEmails()
    }

    getAllExistingEmails = async() => {
        const response = await axios.get('/api/users')
        const userEmailAddresses = response.data.map((user)=> {
            return user.emailAddress
        })
        this.setState({userEmailAddresses})
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
            if (this.state.newUser.password.length < 2) {
                swal('The password must be at least 8 characters')
            } else if (this.state.newUser.password !== this.state.newUser.confirmPassword) {
                swal('The password and confirmation must match!')
            } else if (!this.state.newUser.emailAddress.includes("@") || !this.state.newUser.emailAddress.includes(".")) {
                swal('Make sure you are using a valid e-mail address!')
            } else if (R.contains(this.state.newUser.emailAddress, this.state.userEmailAddresses)) {
                swal('That user already exists')
            } else {
            console.log(this.state.newUser)
            await axios.post('/api/users/', this.state.newUser)
            }
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