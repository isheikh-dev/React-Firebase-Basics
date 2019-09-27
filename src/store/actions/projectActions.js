export const createProject = (project) => {
    return (dispatch , getState, { getFirebase, getFirestore }) => {
        // make asyn call to firestore
        const firestore = getFirestore();
        // grap the profile and user data from firebase 
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        // add to collection projects new Doc
        firestore.collection('projects').add({
            // return the project inserted data usin higher order mapper
            ...project,
            // insert this as dummy data
            authorFirstName: profile.firstName,
            authorLastName:  profile.lastName,
            authorId:   authorId,
            createAt: new Date()
        }).then(() => {
            // dispatch that action when it success
            dispatch({ type: 'CREATE_PROJECT' , project });
        }).catch((err) => {
            // dispatch this action when it fails
            dispatch({ type: 'CREATE_PROJECT_ERROR' , err });
        })
        
    }
};