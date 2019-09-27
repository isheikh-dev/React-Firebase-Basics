import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
// this will attach the firebase data to our store
import { firestoreReducer } from 'redux-firestore';

// this for auth firebase
import { firebaseReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
  // this auth property is attached to authReducer 
  auth: authReducer,
  project: projectReducer,
  // sink the data into firestore property but i will have to attach each collection to specific component
  firestore: firestoreReducer,
  // sink our auth state with firebase auth
  // will pass to navbar as it's the component responsible for showing  the auth links
  firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object 