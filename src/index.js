
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';


import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig), // redux bindings for firestore 
    //  here we are loading firebase to redux , so we will pass second params to wait until it fully loaded 
    reactReduxFirebase(
      fbConfig, 
      {
        useFirestoreForProfile: true ,
        userProfile: 'users',
        attachAuthIsReady: true
      }
    )// redux binding for firebase
  )
);



//  here i wait until firebase is ready then render the  dom 
store.firebaseAuthIsReady.then( () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  serviceWorker.unregister();
})

