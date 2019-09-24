import { all } from 'redux-saga/effects';
import { login, getdata, searchUser, getdeptdata, searchDept, createUser } from 'actions/saga';

export default function* rootSaga() {
    yield all([ login(),
                getdata(), 
                searchUser(), 
                getdeptdata(), 
                searchDept(),
                createUser(),
            ]);
}
