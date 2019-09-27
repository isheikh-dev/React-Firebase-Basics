const initState = {
    // state dummy data
    projects:[
        {id: '1', title: 'title 1 ', content: 'bla bla bla'},
        {id: '2', title: 'title 2 ', content: 'bla bla bla'},
        {id: '3', title: 'title 3 ', content: 'bla bla bla'},
        {id: '4', title: 'title 4 ', content: 'bla bla bla'}
    ]
}

const projectReducer = (state = initState, action) => {

    // this reducer will be related to project only accept state and action
    // loop through the action type with specific code excute 
    switch (action.type) { 
        case 'CREATE_PROJECT': 
            console.log('created project', action.project)
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('created project error', action.err)
            return state;
        default:
            return state;
    }

 }

export default projectReducer