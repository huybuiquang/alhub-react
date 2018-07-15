import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink as RouterNavLink} from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import { FormattedMessage } from 'react-intl';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import * as actions from '../../actions/auth'
import * as locale from '../../actions/locale'

class TopNavigation extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        const {user, logout, setLocale} = this.props;
        return (
            <div>
        <Navbar color="faded" light expand="sm">
          <NavbarBrand tag={RouterNavLink} activeClassName="active" to="/"><FormattedMessage id="nav.home" defaultMessage="Home" /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="" navbar>
              <NavItem>
                <NavLink tag={RouterNavLink} activeClassName="active" to="/dashboard">
                   <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard" /> </NavLink>
              </NavItem>
              
            </Nav>
            <Nav className="ml-auto" navbar>
                <a role="button" onClick={()=>setLocale('en')} >EN</a> | 
                <a role="button" onClick={()=>setLocale('vi')} >VI</a>
              <UncontrolledDropdown  nav inNavbar>
                <DropdownToggle nav caret>
                <img
                  className="img-fluid rounded-circle"
                  src={gravatarUrl(user.email, { size: 40 })}
                  alt="Gravatar"
                />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>My Account</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        );
    }
}

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps,{ logout: actions.logout,setLocale: locale.setLocale})(TopNavigation);