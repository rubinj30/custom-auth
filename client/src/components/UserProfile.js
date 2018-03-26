import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Label, InputField, CenterColumn, Button, ColumnTitle } from './styled-components/Styling'
import axios from 'axios'
import HeaderBar from './HeaderBar'
import swal from 'sweetalert'
import validator from 'validator'
const isPhoneNumber = require('is-phone-number');

const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
    .is().min(6)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().not().spaces()
    .is().not().oneOf(['password', 'Password', 'Passw0rd', 'Password123']);

class UserProfile extends Component {

    state = {
        user: {},
        editShowing: false,
        originalEmailAddress: '',
        redirectToNewUrl: false
    }

    componentWillMount = () => {
        this.getUser()
    }

    getUser = async () => {
        const emailAddress = localStorage.getItem('emailAddress')
        const response = await axios.get(`/api/users/${emailAddress}`)
        this.setState({
            user: response.data,
            originalEmailAddress: localStorage.emailAddress
        })
    }

    toggleEdit = () => {
        this.setState({ editShowing: !this.state.editShowing })
    }

    handleChange = (event) => {
        event.preventDefault()
        const attributeName = event.target.name
        const attributeValue = event.target.value
        const user = { ...this.state.user }
        user[attributeName] = attributeValue
        this.setState({ user })
    }

    updateUser = async (event) => {
        try {
            console.log("Updating");
            event.preventDefault()
            if (!schema.validate(this.state.user.password)) {
                swal('That is not a valid password')
            } else if (this.state.user.password !== this.state.user.confirmPassword) {
                swal('The password and confirmation must match!')
            } else if (!validator.isEmail(this.state.user.emailAddress)) {
                swal('You must use a valid e-mail address')
            } else if (!isPhoneNumber(this.state.user.phoneNumber)) {
                swal('You must use a valid phone number including dashes or dashes and parentheses')
            } else {
                const response = await axios.patch('/api/users', this.state)
                if (response.data.error) {

                    // if e-mail exists, this will notify the user
                    swal(response.data.error)
                } else {
                    localStorage.setItem('emailAddress', response.data.emailAddress)
                    this.setState({
                        user: response.data,
                        editShowing: false
                    })
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteUser = async () => {
        const user = await axios.delete(`/api/users/${this.state.originalEmailAddress}`)
        swal(`Deleted ${user.data.emailAddress}'s profile`)
        localStorage.clear()
        this.setState({ redirectToNewUrl: !this.state.redirectToNewUrl })
    }

    render() {

        if (this.state.redirectToNewUrl) {
            return <Redirect to={`/`} />
        }

        return (
            <div>
                <HeaderBar />
                <CenterColumn>

                    {
                        this.state.editShowing ?
                            <CenterColumn>
                                <ColumnTitle>User Profile</ColumnTitle>
                                <ReversedButton onClick={this.toggleEdit}>Cancel Edits</ReversedButton>
                                <InputField onChange={this.handleChange}
                                    placeholder="First Name" name="firstName" value={this.state.user.firstName} required />
                                <InputField onChange={this.handleChange}
                                    placeholder="Last Name" name="lastName" value={this.state.user.lastName} required />
                                <InputField onChange={this.handleChange}
                                    placeholder="E-mail" name="emailAddress" value={this.state.user.emailAddress} required />
                                <InputField onChange={this.handleChange}
                                    placeholder="Phone (ex: 555-555-5555)" name="phoneNumber" value={this.state.user.phoneNumber} required />
                                <InputField onChange={this.handleChange}
                                    placeholder="Password" name="password" type="password" required />
                                <Label>* 6-20 characters, have at least one uppercase letter, one lowercase letter, one digit, no spaces</Label>
                                <InputField onChange={this.handleChange}
                                    placeholder="Confirm Password" name="confirmPassword" type="password" required />
                                <Button onClick={this.updateUser}>Update User Info</Button>
                            </CenterColumn>
                            :
                            <CenterColumn>
                                <ColumnTitle>User Profile</ColumnTitle>
                                <Button onClick={this.toggleEdit}>Edit User Info</Button>
                                <ProfileDiv>{this.state.user.firstName}</ProfileDiv>
                                <ProfileDiv>{this.state.user.lastName}</ProfileDiv>
                                <ProfileDiv>{this.state.user.emailAddress}</ProfileDiv>
                                <ProfileDiv>{this.state.user.phoneNumber}</ProfileDiv>
                            </CenterColumn>
                    }
                    <DeleteButton onClick={this.deleteUser}>Delete User</DeleteButton>
                </CenterColumn>
            </div>
        );
    }
}

export default UserProfile;

const ProfileDiv = styled.div`
    padding: 10px;
    font-size: 20px;
`

const ReversedButton = styled.button`
    font-size: 16px;
    text-transform: uppercase;
    padding: 4px 20px;
    height: 30px;
    margin-top: 5px;
    width: 200px;
    text-align: center;
    color: #228848;
    text-decoration: none;
    background-color: #228848;
    color: white;
    &:hover {
        border: 1px solid #228848;
    }
`

const DeleteButton = styled.button`
    font-size: 16px;
    text-transform: uppercase;
    border: 1px solid #228848;
    padding: 4px 20px;
    height: 30px;
    margin-top: 5px;
    width: 200px;
    text-align: center;
    color: #228848;
    text-decoration: none;
    &:hover {
        background-color: red;
        color: white;
    }
`