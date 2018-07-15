// eslint-disable-next-line prefer-stateless-function
import React,{Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {login} from '../../actions/auth';
import LoginForm from '../forms/LoginForm';

class LoginPage extends Component {
    submit = (data)=>
        this.props.login(data).then(()=>{
            this.props.history.push("/dashboard");
        });
    
    render() {
        return (
            <div>
                <div className="container" style={{ height: "100vh" }}>
                <div className="row align-items-center" style={{ height: "100vh" }}>
                    <div className="col col-xs-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3">
                    <div className="card">
                        <h2 className="card-header">Welcome Back!</h2>
                        <div className="card-body">
                        <LoginForm submit={this.submit} />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    login: PropTypes.func.isRequired,
};
export default connect(null,{login})(LoginPage);
