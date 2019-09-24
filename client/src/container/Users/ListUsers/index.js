import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserTable from './UserTable';
import { connect } from 'react-redux';
import { getdataRequest, searchUserRequest } from 'actions';
import './style.scss';

class ListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }
    componentWillMount() {
        this.props.getdataRequest();
    }

    keyupsearch = e => {
        this.setState({
            search: e.target.value
        });

        this.props.searchUserRequest({ searchname: e.target.value });
    };

    render() {
        
        return (
            <UserTable
                datas={this.props.getdata.response}
                keyupsearch={this.keyupsearch}
               
            />
        );
    }
}
ListUsers.propTypes = {
    // getdata: PropTypes.func.isRequired,
    // data: PropTypes.array.isRequired,
    // searchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToprops = dispatch => ({
    getdataRequest: () => dispatch(getdataRequest()),
    searchUserRequest: object=> dispatch(searchUserRequest(object))   
});

export default connect(
    mapStateToProps,
    mapDispatchToprops
)(ListUsers);
