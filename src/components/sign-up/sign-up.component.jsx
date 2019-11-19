import React from 'react'
import { withRouter } from 'react-router-dom'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import axios from 'axios';

import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',  
            confirmPassword: ''   
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match")
            return
        }

        try {

            let axiosConfig = {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': 'https://cobalt-shop.herokuapp.com/',
                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                }
              }
            const response = await axios.post('https://cobalt-shop.herokuapp.com/register', {firstName, lastName, email, password}, axiosConfig)
            const data = response.data 

            if (data.success === false) {
                data.errors.map(error => {
                    return alert(`${error.message}`)
                })

                return

            } else {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',  
                    confirmPassword: '' 
                })
                this.props.getUser();
            }

        } catch (error) {
            console.error(error);
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState({ [name]: value})
    }
    render() {
        const { firstName, lastName, email, password, confirmPassword } = this.state;

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit} >
                    <FormInput
                    type='text'
                    name='firstName'
                    value={firstName}
                    label='First Name'
                    onChange={this.handleChange}
                    required
                    />
                    <FormInput
                    type='text'
                    name='lastName'
                    value={lastName}
                    label='Last Name'
                    onChange={this.handleChange}
                    required
                    />
                    <FormInput
                    type='email'
                    name='email'
                    value={email}
                    label='Email'
                    minLength='6'
                    onChange={this.handleChange}
                    required
                    />
                    <FormInput
                    type='password'
                    name='password'
                    value={password}
                    label='Password'
                    minLength='6'
                    onChange={this.handleChange}
                    required
                    />
                    <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    label='confirmPassword'
                    onChange={this.handleChange}
                    required
                    />
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        )  
    }
  
}

export default withRouter(SignUp);