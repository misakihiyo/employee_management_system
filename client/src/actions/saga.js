import { call, put, takeLatest , takeEvery} from 'redux-saga/effects';
import * as actions from './index';
import { loginCall, getdataCall,getdeptdataCall, searchUserCall, searchDeptCall, createUserCall} from 'Redux/services';

export function* loginService(action) {
    const response = yield call(loginCall, action.myJSONObject);
    console.log(response.success);
    if (response.success) {
        yield put(actions.loginSuccess(response));
    } else {
        yield put(actions.loginFailure(response));
    }
}

export function* searchUser() {
    yield takeLatest('SEARCH_USER_REQUEST', searchUserService);
}

export function* searchUserService(action) {
    const response = yield call(searchUserCall, action.obj);
  
    yield put(actions.searchUserSuccess(response));
    
}

export function* searchDept() {
    yield takeLatest('SEARCH_DEPT_REQUEST', searchDeptService);
}

export function* searchDeptService(action) {
    const response = yield call(searchDeptCall, action.obj);
  
    yield put(actions.searchDeptSuccess(response));
    
}

export function* login() {
    yield takeLatest('LOGIN_REQUEST', loginService);
}

export function* getdeptdataService() {
    const response = yield call(getdeptdataCall);
    console.log(response)
    if(response.success){   
        yield put(actions.getdeptdataSuccess(response));
    } else {
        yield put(actions.getdeptdataFailure(response));
    }
}

export function* getdeptdata() {
    yield takeEvery('GET_DEPT_REQUEST', getdeptdataService);
}

export function* getdataService() {
    console.log('getdataService');
    const response = yield call(getdataCall);
    if (response.success) {        
        const datas = [];
        JSON.parse(response.content).map(data => {
            const obj = [
                {
                    _id: data._id,
                    username: data.username,
                    email: data.email,
                    role: data.role,
                    department: data.department,
                    age: data.age,
                    dob: data.dob,
                    contact: data.contact,
                    address: data.address,
                    password: data.password,
                    deleted: data.deleted,
                    imagePath: data.imagePath
                }
            ];
            if (data.deleted !== true) {
                Array.prototype.push.apply(datas, obj);
            }
        }); 
       
        yield put(actions.getdataSuccess(datas));
    } else {
        yield put(actions.getdataFailure(response));
    }
}

export function* getdata() {
    console.log('getdata')
    yield takeEvery('GET_DATA_REQUEST', getdataService);
}

export function* createUser() {
    yield takeLatest('CREATE_USER', createUserService);
}

export function* createUserService(action) {
    const response = yield call(createUserCall, action.myJSONObject);
    if (response.success){
        yield put(actions.createUserSuccess(response))   
    } else{
        yield put(actions.createUserFailure(response))
    }
}