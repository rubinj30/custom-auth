import styled from 'styled-components'

export const InputField = styled.input`
    height: 48px;
    font-style: italic;
    padding: 6px 12px;
    font-size: 18px;
    line-height: 1.42857143;
    color: #222223;
    background-color: #fff;
    margin: 5px;
`

export const CenterColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Button = styled.div`
    font-size: 16px;
    text-transform: uppercase;
    border: 1px solid #228848;
    padding: 4px 20px;
    margin-top: 5px;
    width: 200px;
    text-align: center;
    color: #228848;
    a {
        text-decoration: none;
        color: white;
    }
    &:hover {
        background-color: #228848;
        color: white;
    }


`

export const LogoImg = styled.img`
    padding: 20px;
`

export const ButtonContainer = styled.div`
    padding: 30px;
`