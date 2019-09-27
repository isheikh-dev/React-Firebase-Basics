import React, { Component } from 'react'

//  we will need to import connect to connect to sign in action which will interact with the auth reducer
import { connect } from 'react-redux'
// will import the sign in action 
import { signIn } from '../../store/actions/authActions'
// then connect this component to redux at the bottom 


import { Redirect }                 from 'react-router-dom'

class SignIn extends Component {
    state  = {
        email:      '', 
        password:   '', 
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit= (e) => {
        e.preventDefault();
        // here i access signIn method through our props , and pass it the pass , email 
        this.props.signIn(this.state);
    }
    render() {
        const   { authError , auth} = this.props;
        if (auth.uid) { return <Redirect to="/" /> }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">

                    <h5 className="grey-text text-darken-3">Sign In</h5>

                    <div className="input-field">
                        <label htmlFor="email"> Email</label>
                        <input type='email' id='email' onChange={this.handleChange}  />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password"> Password</label>
                        <input type='password' id='password' onChange={this.handleChange}  />
                    </div>
                    
                    <div className="input-field">
                        <button className="btn pink lighen-1 z-depth-0">Login</button>
                        <div className="red-text center">
                            {authError ? <p> {authError} </p> : null}
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

//  we will need to map state to get the error msg
const mapStateToProps = (state) => {
    // return an object of auth error
    return {
         // access the state of rootReducer which has property asign to authReducer which by his role has property of authError contain the msg
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

// we will have to pass this map into connect
const mapDispatchToProps = (dispatch) => {
    // we will return an object, represent what we want to attach to the props
    return {
        // we will attach the signIn method , which will take credentials assign to dispatch to action creator signIn Which Will login  
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}
// now we access this   signIn method from our  props

export default connect(mapStateToProps, mapDispatchToProps) (SignIn)
