import React, { Component } from 'react';
import { CenterColumn, InputField, ButtonContainer, Button } from './styled-components/Styling'

class EditUserForm extends Component {

    state = {
        editUser: {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            emailAddress: this.props.user.emailAddress,
            phoneNumber: this.props.user.phoneNumber,
            password: '',
            confirmPassword: ''
        }
    }

    clearChanges = (event) => {
        event.preventDefault()
        this.setState({
            editUser: {
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                emailAddress: this.props.user.emailAddress,
                phoneNumber: this.props.user.phoneNumber,
                password: '',
                confirmPassword: ''
            }
        })
    }

    handleChange = (event) => {
        event.preventDefault()
        const attributeName = event.target.name
        const attributeValue = event.target.value
        const editUser = { ...this.state.editUser }
        editUser[attributeName] = attributeValue
        this.setState({ editUser })
    }

    updateUser = () => {

    }

    render() {
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
                    <Button onClick={this.clearChanges}>Reset Changes</Button>
                </CenterColumn>
            </form>
        );
    }
}

export default EditUserForm;