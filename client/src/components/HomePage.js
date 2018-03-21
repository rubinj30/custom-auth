import React, { Component } from 'react';
import { LogoImg } from './styled-components/Styling'

class HomePage extends Component {
    render() {
        return (
            <div>
                <LogoImg width="200" src="https://assets.hmwallace.com//sources/images/supply_logo-unboxed.svg" alt=""/>
            </div>
        );
    }
}

export default HomePage;