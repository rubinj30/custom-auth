import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { InputField, CenterColumn, LogoImg, Button, ButtonContainer, ColumnTitle, StyledLink } from './styled-components/Styling'
import axios from 'axios'

class LogIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        redirectToProfile: false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        event.preventDefault()
    }

    logUserIn = async (event) => {
        event.preventDefault()
        
        const payload = {
            emailAddress: this.state.emailAddress,
            password: this.state.password
        }

        console.log("PAYLOAD", payload)
        const response = await axios.post('/api/users/login', payload)
        console.log(response.data);
        const newState = response.data
        this.setState({
            redirectToProfile: response.data.redirectToProfile,
            emailAddress: response.data.emailAddress
        })
    }

    render() {
        if (this.state.redirectToProfile) {
            return <Redirect to={`/${this.state.emailAddress}`} />
        }

        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt="supply.com logo"  />
                <form onSubmit={this.logUserIn}>
                    <CenterColumn>
                        <ColumnTitle>Log In</ColumnTitle>
                        <InputField onChange={this.handleChange} placeholder="E-mail Address" name="emailAddress" required/>
                        <InputField onChange={this.handleChange} placeholder="Password" name="password" required/>
                        <ButtonContainer>
                            <Button>Log In</Button>
                            <StyledLink to={'/'}><Button>Back to Home</Button></StyledLink>
                        </ButtonContainer>
                    </CenterColumn>
                </form>
            </div>
        )
    }
}

export default LogIn;