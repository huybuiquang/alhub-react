import React from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types';
import Loader from "react-loader";
import { IntlProvider } from 'react-intl';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashBoardPage from './components/pages/DashBoardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import TopNavigation from './components/navigation/TopNavigation';
import {fetchCurrentUserRequest} from './actions/users';
import messages from './messages';

class App extends React.Component {

  componentDidMount() {
    if(this.props.isAuthenticated) this.props.fetchCurrentUserRequest();
  }
  render() {
    const {location, isAuthenticated, loaded, lang} = this.props;
    
    return (
      <IntlProvider locale={lang}
      messages={messages[lang]}
      key={ lang }
      >
      <div className="ui container">
        <Loader loaded={loaded}>            
            { isAuthenticated && <TopNavigation/>}
            <Route location={location} path="/" exact component={HomePage} />
            <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
            <GuestRoute location={location} path="/login" exact={false} component={LoginPage} />
            <GuestRoute location={location} path="/forgot_password" exact={false} component={ForgotPasswordPage} />
            <GuestRoute location={location} path="/reset_password/:token" exact={false} component={ResetPasswordPage} />
            <GuestRoute location={location} path="/signup" exact={false} component={SignupPage} />
            <UserRoute location={location} path="/dashboard" exact={false} component={DashBoardPage} />
        </Loader>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  fetchCurrentUserRequest: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

function mapStateToProps(state){
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded,
    lang: state.locale.lang,
  }
}
export default connect(mapStateToProps,{ fetchCurrentUserRequest })( App);
