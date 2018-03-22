import React, { Component } from 'react';
import styled from 'styled-components'
import { LogoImg, CenterColumn, Button, ColumnTitle} from './styled-components/Styling'
import EditUserForm from './EditUserForm'
import axios from 'axios'

class UserProfile extends Component {

    state = {
        user: {},
        editShowing: true
    }

    componentWillMount = () => {
        this.getUser()
    }

    getUser = async () => {
        const response = await axios.get(`/api/users/${this.props.match.params.id}`)
        this.setState({ user: response.data })
    }

    toggleEdit = () => {
        this.setState({ editShowing: !this.state.editShowing })
    }

    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="supply.com logo" />
                <CenterColumn>
                    <ColumnTitle>User Profile</ColumnTitle>
                    <Button onClick={this.toggleEdit}>Edit</Button>
                    {
                        this.state.editShowing ?
                            <div>
                                <ProfileDiv>{this.state.user.firstName}</ProfileDiv>
                                <ProfileDiv>{this.state.user.lastName}</ProfileDiv>
                                <ProfileDiv>{this.state.user.emailAddress}</ProfileDiv>
                                <ProfileDiv>{this.state.user.phoneNumber}</ProfileDiv>
                            </div>
                            :
                            <EditUserForm
                                user={this.state.user}
                            />
                    }
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