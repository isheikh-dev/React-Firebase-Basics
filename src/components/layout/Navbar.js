import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks' 
// to connect to redux and have access for state property
import {connect} from 'react-redux'
 
const Navbar = (props) => {
    const { auth, profile } = props;
    // console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks/>
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className='container'>
                <Link to='/' className="brand-logo" >
                    MarioPlan
                </Link>
                { links }
            </div>
        </nav>
    )
}
// this map the state to return our property required
const mapStateToProps = (state) =>  {
    console.log(state);
     return {
         // access this property through this component
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Navbar)