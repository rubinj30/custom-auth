import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Label, LogoImg, CenterColumn, InputField, ButtonContainer, Button, ColumnTitle, StyledLink } from './styled-components/Styling'
import axios from 'axios'
import swal from 'sweetalert'
import validator from 'validator'
const isPhoneNumber = require('is-phone-number');
// const R = require('ramda');
const passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
    .is().min(6)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .is().not().oneOf(['password', 'Password', 'Passw0rd', 'Password123']);

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
            if (!schema.validate(this.state.newUser.password)) {
                swal('That is not a valid password')
            } else if (this.state.newUser.password !== this.state.newUser.confirmPassword) {
                swal('The password and confirmation must match')
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
                            placeholder="Phone (ex: 555-555-5555)" name="phoneNumber" required />
                        <InputField onChange={this.handleChange}
                            placeholder="Password" name="password" type="password" required />
                        <Label>* 6-20 characters, have at least one uppercase letter, one lowercase letter, one digit, no spaces</Label>
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

