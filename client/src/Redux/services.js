import Axios from 'axios';

export const loginCall = myJsonObject => {
    const endpoint = `http://localhost:4000/users/login`;
    return Axios.post(endpoint, myJsonObject)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
};

export const getdataCall = () => {
    const endpoint = `http://localhost:4000/users`;
    return Axios.get(endpoint)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
    
}

export const getdeptdataCall = () => {
    const endpoint = `http://localhost:4000/departments`;
    return Axios.get(endpoint)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response);
            return error.response.data;
        });
    
}

export const searchUserCall = (obj) => {
    return Axios.post('http://localhost:4000/searchuser', obj)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error.response);
        return error.response.data;
    });
}



export const searchDeptCall = (obj) => {
    return Axios.post('http://localhost:4000/searchdept', obj)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error.response);
        return error.response.data;
    });
}



export const createUserCall = (myJSONObject) => {
    return Axios.post('http://localhost:4000/users', myJSONObject)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        return error.response.data;
    });
}