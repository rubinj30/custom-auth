import React, { Component } from 'react';
import styled from 'styled-components'
import { CenterColumn, Button, ColumnTitle } from './styled-components/Styling'
import EditUserForm from './EditUserForm'
import axios from 'axios'
import HeaderBar from './HeaderBar'

class UserProfile extends Component {

    state = {
        user: {},
        editShowing: false
    }

    componentWillMount = () => {
        this.getUser()
    }

    getUser = async () => {
        const emailAddress = localStorage.getItem('emailAddress')
        console.log(emailAddress);
        const response = await axios.get(`/api/users/${emailAddress}`)
        console.log(response.data);
        this.setState({ user: response.data })
    }

    toggleEdit = () => {
        this.setState({ editShowing: !this.state.editShowing })
    }

    render() {
        return (
            <div>
                <HeaderBar />
                <CenterColumn>
                    
                    {
                        this.state.editShowing ?
                            <CenterColumn>
                                <ColumnTitle>User Profile</ColumnTitle>
                                <ReversedButton onClick={this.toggleEdit}>Cancel Edits</ReversedButton>
                                <EditUserForm
                                    user={this.state.user}
                                />
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