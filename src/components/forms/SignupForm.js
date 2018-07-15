import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import {Link} from 'react-router-dom';
import InputField from './InputField';

class SignupForm extends Component {

    state ={
        data:{
            email:'',
            password:'',
            username:''
        },
        loading: false,
        errors: {}
    }

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.username) errors.username = "Can't be blank"
        if (!data.password) errors.password = "Can't be blank"
        return errors;
    }

    render() {
        const {data, loading, errors} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <InputField 
                    type="email"
                    id= "email"
                    name="email"
                    labelName="Email"
                    placeholder="example@email.com"
                    value={data.email}
                    onChange={this.onChange}
                    error={errors.email}
                />
                <InputField 
                    type="text"
                    id= "username"
                    name="username"
                    labelName="Username"
                    placeholder=""
                    value={data.username}
                    onChange={this.onChange}
                    error={errors.username}
                />
                <InputField 
                    type="password"
                    id= "password"
                    name="password"
                    labelName="Password"
                    placeholder="Make it secure"
                    value={data.password}
                    onChange={this.onChange}
                    error={errors.password}
                />
                 <button type="submit" className="btn btn-primary btn-block">
                Sign Up
                </button>

                <small className="form-text text-center">
                or <Link to="/login">LOGIN</Link> if you have an account
                </small>
                {/* {
                    errors.global &&
                    <Message negative>
                        <Message.Header>
                            Something went wrong
                        </Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                }
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>Login</Button>  */}
            </form>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default SignupForm;