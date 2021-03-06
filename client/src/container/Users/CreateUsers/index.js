import React from 'react';
import CreateUserForm from './CreateUserForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUserRequest, sendMail, getdeptdataRequest, notification } from 'actions';
import decoder from 'jwt-decode';
import './style.scss';

export class CreateUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            username: '',
            department: '',
            role: '',
            email: '',
            emailvalid: '',
            namevalid: '',
            datas: [],
            _id: '',
            deptname: '',
            depthead: '',
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }

    componentDidMount() {
        this.props.getdeptdataRequest();
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
            errorMessage: ''
        });

        this.validateInput(name, value);
    }

    validateInput = (name, value) => {
        if (name === 'username') {
            if (/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/.test(value)) {
                this.setState({ namevalid: 'valid' });
            } else {
                this.setState({ namevalid: 'invalid' });
            }
        } else if (name === 'email') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.setState({ emailvalid: 'valid' });
            } else {
                this.setState({ emailvalid: 'invalid' });
            }
        } else if (name === 'email') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.setState({ emailvalid: 'valid' });
            } else {
                this.setState({ emailvalid: 'invalid' });
            }
        }
    };

    generatePassword() {
        var length = 8,
            charset =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            retVal = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }

        return retVal;
    }

    buttonClick(e) {
        e.preventDefault();

        const password = this.generatePassword();

        if (
            this.state.email !== '' &&
            this.state.username !== '' &&
            this.state.emailvalid === 'valid' &&
            this.state.namevalid === 'valid' &&
            this.state.role &&
            this.state.department
        ) {
            let myJSONObject = {
                username: this.state.username,
                email: this.state.email,
                password: password,
                role: this.state.role,
                department: this.state.department,
                imagePath:
                    'https://stage-bitsbeat-s3.s3.us-west-2.amazonaws.com/1566289109721'
            };

            this.props.createUserRequest(myJSONObject);
            // this.props.notification(
            //     `New user ${this.state.username} has been created`
            // );

            setTimeout(() => {
                
                if (this.props.createdata.response) {                    
                    if (this.props.createdata.response.success) {
                        this.props.history.push(
                            `/${this.state.loggedin}/listuser`,
                            { value: true }
                        );
                    } else {
                        this.setState({
                            errorMessage: this.props.createdata.response
                        });
                    }
                }
            }, 5000);
        } else if (this.state.emailvalid === 'invalid') {
            this.setState({ errorMessage: 'Please enter valid Email' });
        } else if (this.state.namevalid === 'invalid') {
            this.setState({ errorMessage: 'Please enter valid Name' });
        } else {
            this.setState({ errorMessage: 'Fill required information' });
        }
    }

    selectValue(name, title) {
        this.setState({
            [title]: name,
            errorMessage: ''
        });
    }

    render() {
        console.log(this.props, "allrpoese")
        return (
            <CreateUserForm
                handleChange={e => this.handleChange(e)}
                emailvalid={this.state.emailvalid}
                namevalid={this.state.namevalid}
                onClick={e => this.buttonClick(e)}
                dropdown={this.props.getdata.response.content}
                selectValue={this.selectValue.bind(this)}
                loggedin={this.state.loggedin}
                error={this.state.errorMessage}
            />
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToprops = dispatch => ({
    getdeptdataRequest: () => dispatch(getdeptdataRequest()),
    createUserRequest: object => dispatch(createUserRequest(object))
    
});

export default connect(
    mapStateToProps,
    mapDispatchToprops
)(CreateUsers);
