import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getdeptdataRequest, searchDeptRequest, notification } from 'actions';
import { withRouter } from 'react-router-dom';
import DeptTable from './DeptTable';

import './style.scss';

class ListDepart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            name: '',
            dept: [],
            search: '',
            deptdata: [],
            notification: ''
        };
    }

    componentDidMount() {
        this.props.getdeptdataRequest();
    }
    
    componentWillReceiveProps() {
        this.setState({
            deptdata: this.props.deptdatas
        });
    }

    keyupsearch = e => {
        this.setState({
            search: e.target.value
        });

        this.props.searchDept({ search: e.target.value });
    };

    render() {
        console.log(this.props, "alll the props")
        return (
            <DeptTable
                deptdatas={this.props.getdata.response.content}
                keyupsearch={this.keyupsearch}
                search={this.search}
                responseData={this.props.getdata.response}
            />
        );
    }
}

// ListDepart.propTypes = {
//     getdeptdata: PropTypes.func.isRequired,
//     searchdept: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToprops = dispatch => ({
    getdeptdataRequest: () => dispatch(getdeptdataRequest()),
    searchDept: obj=> dispatch(searchDeptRequest(obj))
    
});
export default connect(
    mapStateToProps,
    mapDispatchToprops
)(withRouter(ListDepart));
