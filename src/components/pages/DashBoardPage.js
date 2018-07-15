import React from 'react';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';



class DashBoardPage extends React.Component  {

    componentDidMount() {

    }
    


    render() {
        const {isConfirmed} = this.props;
        return (
            <div>
                {!isConfirmed && <ConfirmEmailMessage/>}
            </div>
        );
    }
};

DashBoardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
 

};

function mapStateToProps(state){
    return{
        isConfirmed: !!state.user.confirmed,

    }
}
export default connect(mapStateToProps,{  })(DashBoardPage);