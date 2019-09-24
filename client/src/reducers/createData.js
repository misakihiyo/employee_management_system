import produce from 'immer';
import { switchCase } from '@babel/types';
const initialState = {
    data: {},
    response: [],
    res: {},
    error: {},
    loading: {}
};

const createdData = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type){
            case 'CREATE_USER':
                draft.loading= true;
                break;
            case 'CREATE_USER_SUCCESS':
                draft.loading =false;
                draft.response = action.response
                break;
            case 'CREATE_USER_FAILURE':
                draft.loading =false;
                draft.response = action.response
                break;
            case 'SEND_EMAIL':
                return {
                    data: action.payload,
                    res: action.response,
                    error: action.error
                };
            case 'UPDATE_DATA':
                return {
                    response: action.response
                };
            case 'CREATE_DEPT':
                return {
                    data: action.payload,
                    response: action.response
                };
            case 'UPDATE_DEPT':
                return {
                    data: action.payload,
                    response: action.response
                };
            case 'UPDATE_PASSWORD':
                return {
                    res: action.response
                };

            default:
                return state;
        }
    })
export default createdData;
