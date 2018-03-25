import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CenterColumn, InputField, Button } from './styled-components/Styling'
import axios from 'axios'
import swal from 'sweetalert'
import validator from 'validator'

class EditUserForm extends Component {

    state = {
        editUser: {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            emailAddress: this.props.user.emailAddress,
            phoneNumber: this.props.user.phoneNumber,
            password: '',
            confirmPassword: ''
        },
        originalEmailAddress: this.props.user.emailAddress,
        redirectToNewUrl: false
    }

    handleChange = (event) => {
        event.preventDefault()
        const attributeName = event.target.name
        const attributeValue = event.target.value
        const editUser = { ...this.state.editUser }
        editUser[attributeName] = attributeValue
        this.setState({ editUser })
    }

    updateUser = async (event) => {
        try {
            event.preventDefault()
            if (this.state.editUser.password.length < 2) {
                swal('The password must be at least 8 characters')
            } else if (this.state.editUser.password !== this.state.editUser.confirmPassword) {
                swal('The password and confirmation must match!')
            } else if (!validator.isEmail(this.state.editUser.emailAddress)) {
                swal('Make sure you are using a valid e-mail address!')
            } else {
                const response = await axios.patch('/api/users', this.state)

                if (response.data.error) {
                    swal(response.data.error)
                } else {
                    console.log(response.data)
                    localStorage.setItem('emailAddress', response.data.editUser.emailAddress)
                    this.setState({
                        editUser: response.data.editUser,
                        redirectToNewUrl: response.data.redirectToNewUrl
                    })
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {

        if (this.state.redirectToNewUrl) {
            console.log("STATE", this.state)
            return <Redirect to={`/${this.state.editUser.emailAddress}`} />
        }

        return (
            <form onSubmit={this.updateUser}>
                <CenterColumn>
                    <InputField onChange={this.handleChange}
                        placeholder="First Name" name="firstName" value={this.state.editUser.firstName} required />
                    <InputField onChange={this.handleChange}
                        placeholder="Last Name" name="lastName" value={this.state.editUser.lastName} required />
                    <InputField onChange={this.handleChange}
                        placeholder="E-mail" name="emailAddress" value={this.state.editUser.emailAddress} required />
                    <InputField onChange={this.handleChange}
                        placeholder="Phone Number" name="phoneNumber" value={this.state.editUser.phoneNumber} required />
                    <InputField onChange={this.handleChange}
                        placeholder="Password" name="password" type="password" required />
                    <InputField onChange={this.handleChange}
                        placeholder="Confirm Password" name="confirmPassword" type="password" required />
                    <Button onClick={this.updateUser}>Update User Info</Button>
                </CenterColumn>
            </form>
        );
    }
}

export default EditUserForm

