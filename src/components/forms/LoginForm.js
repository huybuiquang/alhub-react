// eslint-disable-next-line prefer-stateless-function

import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';
import InputField from './InputField';

class LoginForm extends Component {
    state = {
        data: {
            email: '',
            password: ''
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

        if (!data.password) errors.password = "Can't be blank"
        return errors;
    }
    render() {
        const { data, errors, loading } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                {
                    errors.global &&
                    <InlineError text={errors.global} />
                }
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
                Login
                </button>
            </form>
        );
    }
}
LoginForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default LoginForm;