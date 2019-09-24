import React, { Component } from 'react';
import { getdataRequest } from 'actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import decoder from 'jwt-decode';
import EmployeeHierarchySystem from './EmployeeHierarchySystem';
import './style.scss';

export class EmployeeHierarchy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alldata: this.props.datas,
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }

    componentDidMount() {
        this.props.getdataRequest();
    }

    render() {
        return (
            <EmployeeHierarchySystem
                toListUser={e => {
                    this.toListUser(e);
                }}
                alldata={this.props.datas}
            />
        );
    }
}

EmployeeHierarchy.propTypes = {
    getdata: PropTypes.func.isRequired,
    datas: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToprops = dispatch => ({
    getdataRequest: object => dispatch(getdataRequest())
});


export default connect(
    mapStateToProps,
    mapDispatchToprops
)(withRouter(EmployeeHierarchy));
