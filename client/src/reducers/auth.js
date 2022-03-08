import { AUTH, LOGOUT } from '../component/constant/actionTypes';

const authReducer = (state = {authData: null}, action) => {
    switch (action.type){
        case AUTH :
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            console.log(action.type );
            return { ...state, authData: action?.data }
        case LOGOUT :
            localStorage.clear();

            return { ...state, authData: null }
        default :
        return state;

    }
}
export default authReducer;