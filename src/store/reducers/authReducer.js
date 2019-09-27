 
// this auth reducer is attached to auth property in the root reducer

const initState = {
    authError : null 
}

const authReducer = (state = initState, action) => {

    switch(action.type){
        // will attach an error to auth property
        case 'LOGIN_ERROR':
             console.log('login error');
            return {
                // will take state and spread  it, and override it 
                ...state,
                authError : 'Login Fails'
            }
        case "LOGIN_SUCCESS": 
            console.log('login success');
            return {
                // will take state and spread  it, and override it  , turn the error into null 
                ...state,
                authError :null
            }
        case "SIGNOUT_SUCCESS": 
            console.log('signout success');
            return state
        case "SIGNUP_SUCCESS": 
            console.log('signup  success');
            return {
                ...state,
                authError:null
            }
        case "SIGNUP_ERROR": 
            console.log('signup success');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }
 }

export default authReducer