import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const InputField = styled.input`
    height: 32px;
    font-style: italic;
    padding: 6px 12px;
    font-size: 18px;
    line-height: 1.42857143;
    color: #222223;
    background-color: #fff;
    margin: 5px;
    width: 250px;
`

export const CenterColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Button = styled.button`
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
        background-color: #228848;
        color: white;
    }
`

export const LogoImg = styled.img`
    padding: 20px;
`

export const ButtonContainer = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
`

export const ColumnTitle = styled.div`
    padding-bottom: 30px;
    font-size: 35px;
    font-weight: bold;
    color: #228848;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
`

export const Label = styled.label`
    font-size: 10px;
    color: grey;
    width: 250px;
`