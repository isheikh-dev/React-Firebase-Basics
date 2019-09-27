// credentials passed has email , password
// i will call this action into sign in component
export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        // initial firebase instant so we can use it to communicate through the project and sign the user in 
        const firebase = getFirebase();


        // it this credentials are correct then the use will be sign in our app and give us the response
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( () => {
            // dispatch action in the auth reducer 
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        })
    }
}


export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(()=> {
            dispatch({type: "SIGNOUT_SUCCESS"});
        });

    }
}

export const signUp = (newUser) => {
    //  getfirebase to sign up new user to auth service of firebase
    //  get firestore to communicate to our store data
    return ( dispatch, getState,  {getFirebase, getFirestore} ) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        //   create auth for user
        firebase.auth().createUserWithEmailAndPassword( 
            newUser.email,
            newUser.password
        ).then(  response => {
            // store data of user in firestore with users collections 
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName, 
                initials: newUser.firstName[0] + newUser.lastName[0],
            });
        }).then(() => {

            dispatch({ type: 'SIGNUP_SUCCESS' });

        }).catch( (err) => {

            dispatch({type: "SIGNUP_ERROR", err});
            
        })
    }
}