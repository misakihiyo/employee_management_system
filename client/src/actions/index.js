import request from 'request';
const axios = require('axios');

export const loginRequest = myJSONObject => {
    return {
        type: 'LOGIN_REQUEST',
        myJSONObject
    };
};
export const loginSuccess = response => {
    console.log(response, "hahahhaha")
    return {
        type: 'LOGIN_SUCCESS',
        response
    };
};
export const loginFailure = response => {
    console.log('arrived');

    return {
        type: 'LOGIN_FAILURE',
        response
    };
};

export const getdataRequest = () => {
    return{
        type: 'GET_DATA_REQUEST',
    }
};

export const getdataSuccess = response => {
    return {
        type: 'GET_DATA_SUCCESS',
        response
    };
};
export const getdataFailure = response => {
    return {
        type: 'GET_DATA_FAILURE',
        response
    };
};

export const getdeptdataRequest = () => {
    return{
        type: 'GET_DEPT_REQUEST',
    }
};

export const getdeptdataSuccess = response => {
    return {
        type: 'GET_DEPT_SUCCESS',
        response
    };
};
export const getdeptdataFailure = response => {
    return {
        type: 'GET_DEPT_FAILURE',
        response
    };
};

export const searchUserRequest = obj  => {
    return {
        type: 'SEARCH_USER_REQUEST',
        obj
    };    
};

export const searchUserSuccess = response  => {
    
    return {
        type: 'SEARCH_USER_SUCCESS',
        response
    };    
};

export const searchDeptRequest = obj  => {
    return {
        type: 'SEARCH_DEPT_REQUEST',
        obj
    };    
};

export const searchDeptSuccess = response  => {
    
    return {
        type: 'SEARCH_DEPT_SUCCESS',
        response
    };    
};

export const createUserRequest = myJSONObject  => {
    return{
        type: 'CREATE_USER',
        myJSONObject
    }
};

export const createUserSuccess = response  => {
    return {
        type: 'CREATE_USER_SUCCESS',
        response
    };    
};

export const createUserFailure = response  => {
    
    return {
        type: 'CREATE_USER_FAILURE',
        response
    };    
};


export const sendMail = obj => dispatch => {
    let responses = {};
    let errors = {};
    axios
        .put('http://localhost:4000/users/sendlinktomail', obj)
        .then(response => {
            responses = response;
        })
        .catch(function(error) {
            errors = error;
        })
        .finally(function() {
            dispatch({
                type: 'SEND_EMAIL',
                payload: obj,
                response: responses,
                error: errors
            });
        });
};



export const updateData = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/users/?id=${myJSONObject._id}`,
            method: 'PUT',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'UPDATE_DATA',
                response: response
            });
        }
    );
};

export const createDept = myJSONObject => dispatch => {
    request(
        {
            url: 'http://localhost:4000/departments',
            method: 'POST',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            console.log(response);
            dispatch({
                type: 'CREATE_DEPT',
                payload: myJSONObject,
                response: response.body
            });
        }
    );
};

export const updateDept = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/departments/?id=${myJSONObject._id}`,
            method: 'PUT',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'UPDATE_DEPT',
                payload: myJSONObject,
                response: response.body
            });
        }
    );
};


export const verifyToken = tokenObj => dispatch => {
    request(
        {
            url: 'http://localhost:4000/resetpassword/verifytoken',
            method: 'POST',
            json: true,
            body: tokenObj
        },
        (error, response) => {
            dispatch({
                type: 'VERIFY',
                response: response
            });
        }
    );
};

export const updatePassword = obj => dispatch => {
    axios
        .patch(`http://localhost:4000/users/reset-password/${obj.token}`, {
            email: obj.email,
            password: obj.password
        })
        .then(response => {
            dispatch({
                type: 'UPDATE_PASSWORD',
                response: response
            });
        });
};

export const deleteData = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/users/?id=${myJSONObject._id}`,
            method: 'DELETE',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'DELETE_DATA',
                response: response
            });
        }
    );
};

export const deleteDept = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/departments/?id=${myJSONObject._id}`,
            method: 'DELETE',
            json: true // <--Very important!!!
        },
        function(error, response, body) {
            dispatch({
                type: 'DELETE_DEPT',
                response: response
            });
        }
    );
};

export const documents = (formData, config) => dispatch => {
    let responses = {};
    let errors = {};
    axios
        .post('http://localhost:4000/documents', formData, config)
        .then(response => {
            responses = response;
            console.log(response);
            console.log('00');
        })
        .catch(error => {
            responses = error.response;
        })
        .finally(function() {
            dispatch({
                type: 'CREATE_DOCS',
                response: responses,
                error: errors
            });
        });
};

export const getdocuments = (isIndividual, id, role) => dispatch => {
    let responses = {};
    let url = '';
    let myObj = '';
    if (isIndividual) {
        url = `http://localhost:4000/documents/${id}`;
    } else {
        url = `http://localhost:4000/documents/?role=${role}`;
        myObj = {
            email: ''
        };
    }
    axios
        .get(url, myObj)
        .then(response => {
            responses = response;
            console.log(response);
        })
        .catch(error => {
            responses = error.response;
            console.log(error, 'dfasdfasd');
        })
        .finally(function() {
            dispatch({
                type: 'GET_DOCS',
                response: responses
            });
        });
};
export const notification = message => dispatch => {
    dispatch({
        type: 'NOTIFY',
        notification: message
    });
};
