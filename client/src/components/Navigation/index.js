import React, { Component } from 'react';
import './style.scss';
import img from 'assets/img/dummy.jpeg';
import { withRouter } from 'react-router-dom';
import AuthHelperMethods from 'utils/auth';
import decoder from 'jwt-decode';
import Flyout from 'components/Flyout';
import { getdataRequest } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navigation extends Component {
    state = {
        redirect: false,
        showFlyout: false
    };

    handleClick() {
        const Auth = new AuthHelperMethods();
        Auth.logout();
        this.props.history.push('/');
        // window.location.reload();
    }

    showFlyout(e) {
        e.preventDefault();
        this.props.getdataRequest();
        const { showFlyout } = this.state;

        showFlyout
            ? this.setState({ showFlyout: false })
            : this.setState({ showFlyout: true }, () => {
                  document.addEventListener('click', this.hideFlyout);
              });
    }

    hideFlyout = () => {
        this.setState({ showFlyout: false }, () => {
            document.removeEventListener('click', this.hideFlyout);
        });
    };

    profile() {
        const obj = decoder(localStorage.getItem('token_id'));
        const loggedin = obj.role.toLowerCase();
        var thedata = {};
        this.setState({
            showFlyout: false
        });

        this.props.datas.map(adata => {
            if (obj.id === adata._id) {
                thedata = adata;
            }
        });

        this.props.history.push(`/${loggedin}/profile`, thedata);
    }

    render() {
        const obj = decoder(localStorage.getItem('token_id'));
        const name = obj.username;
        const loggedin = obj.role.toLowerCase();
        const imagePath = obj.imagePath;

        return (
            <div className="navigations">
                <nav className="navbar navbar-expand-lg navbar-custom">
                    <div className="custom-nav">
                        <div className="navbar-logo navbar-brand">Company</div>
                        <div className="user-functions">
                            <div className="username">{name}</div>
                            <div className="image-icon d-flex align-items-center">
                                <div
                                    onClick={e => {
                                        this.showFlyout(e);
                                    }}
                                    className="img-div"
                                >
                                    <img
                                        className="user-image"
                                        src={imagePath}
                                        alt="x"
                                    />
                                    <i className="icon-triangle-down" />
                                </div>
                            </div>

                            {this.state.showFlyout && (
                                <Flyout
                                    loggedin={loggedin}
                                    handleClick={e => this.handleClick(e)}
                                    profile={e => this.profile(e)}
                                />
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Navigation.propTypes = {
    getdata: PropTypes.func,
    datas: PropTypes.array
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
)(withRouter(Navigation));
