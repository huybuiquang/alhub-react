import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InlineError extends Component {
    render() {
        return (
            <span style={{color:"#ae5856"}}>
                {this.props.text}
            </span>
        );
    }
}

InlineError.propTypes = {
    text : PropTypes.string.isRequired
}
export default InlineError;