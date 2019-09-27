import React , {Component }         from 'react'
import Notifications                from './Notifications'
import ProjectsList                 from '../projects/ProjectsList'
import {connect}                    from 'react-redux'
//  here i get the connection the firestore to attach it to specific collection
import { firestoreConnect }         from 'react-redux-firebase'
// here i get the compose out to asign muti higher order component togther
import { compose }                  from 'redux'
import { Redirect }                 from 'react-router-dom'

class Dashboard   extends Component {
    render () {
        const {projects , auth, notifications } = this.props;

        if (!auth.uid) { return <Redirect to="/signin" /> }
        return (
            <div className="dashboard container" >
                <div className="row">

                    <div className="col s12 m6">
                        <ProjectsList projects={projects} />
                    </div>

                    <div className="col s12 m5 offset-m1">
                        <Notifications  notifications={notifications} />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
      return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    // this make connection with the firestore and connect that component with specific collection
    //  so any change to that collection this component will here that , and that will event to update the state with that change
    firestoreConnect([
        { collection: 'projects', orderBy: ['createAt', 'desc'] },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(Dashboard)