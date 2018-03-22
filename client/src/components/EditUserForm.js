import React, { Component } from 'react';
import { CenterColumn, InputField, ButtonContainer, Button } from './styled-components/Styling'

class EditUserForm extends Component {

    state = {

    }

    updateUser = () => {

    }

    render() {
        return (
            <form onSubmit={this.updateUser}>
                <CenterColumn>
                    <InputField onChange={this.handleChange}
                        placeholder="First Name" name="firstName" value={this.props.user.firstName} required />
                    <InputField onChange={this.handleChange}
                        placeholder="Last Name" name="lastName" value={this.props.user.lastName} required />
                    <InputField onChange={this.handleChange}
                        placeholder="E-mail" name="emailAddress" value={this.props.user.emailAddress} required />
                    <InputField onChange={this.handleChange}
                        placeholder="Phone Number" name="phoneNumber" value={this.props.user.phoneNumber} required />
                    <InputField onChange={this.handleChange}
                        placeholder="Password" name="password" type="password" required />
                    <InputField onChange={this.handleChange}
                        placeholder="Confirm Password" name="confirmPassword" type="password" required />
                    <ButtonContainer>
                        <Button>Update User Info</Button>
                    </ButtonContainer>
                </CenterColumn>
            </form>
        );
    }
}

export default EditUserForm;