import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { LogoImg, CenterColumn, InputField, ButtonContainer, Button, ColumnTitle, StyledLink } from './styled-components/Styling'
import axios from 'axios'
import swal from 'sweetalert'
import validator from 'validator'
var isPhoneNumber = require('is-phone-number');

// const R = require('ramda');

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
        redirectToProfile: false
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
            } else if (!validator.isEmail(this.state.newUser.emailAddress)) {
                swal('You must use a valid e-mail address')
            } else if (!isPhoneNumber(this.state.newUser.phoneNumber)) {
                swal('You must use a valid phone number')
            } else {
                const response = await axios.post('/api/users/', this.state.newUser)

                if (response.data.error) {
                    swal(response.data.error)
                } else {
                    localStorage.setItem('emailAddress', response.data.newUser.emailAddress)
                    this.setState(
                        {
                            redirectToProfile: response.data.redirectToProfile
                        })
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.redirectToProfile) {
            console.log("REDIRECT", this.state.redirectToProfile)
            return <Redirect to={`/${this.state.newUser.emailAddress}`} />
        }

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
                            placeholder="Phone (555-555-5555)" name="phoneNumber" required />
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