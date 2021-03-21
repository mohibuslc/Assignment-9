import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Container } from 'react-bootstrap';
import Header from '../components/Header/Header';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from './../App';
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [option, setoption] = useState('login')

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        isSignedIn: false,
        error: ''
    });

    const [rideInfo, setRideInfo, loggedinUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var { displayName, email } = result.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                setUser(userDetails);
                setLoggedInUser(userDetails);
                history.replace(from);;
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
                const userDetails = { ...user }
                userDetails.error = errorMessage;
                setUser(userDetails);
                setLoggedInUser(userDetails);
            });
    }

    const fbSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                var { displayName, email } = result.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                setUser(userDetails);
                setLoggedInUser(userDetails);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
                const userDetails = { ...user }
                userDetails.error = errorMessage;
                setUser(userDetails);
                setLoggedInUser(userDetails);
            });
    }

    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");

    const signupSubmit = async data => {
        const userDetails = { ...user };
        userDetails.name = data.name;
        userDetails.password = data.password;
        userDetails.email = data.email;
        setUser(userDetails)
        setLoggedInUser(userDetails);

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                var user = userCredential.user;
                var { displayName, email } = userCredential.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                setUser(userDetails);
                setLoggedInUser(userDetails);
                history.replace(from);
                updateUserName(data.name);
                console.log('object', userCredential.user);
            })
            .catch((error) => {
                console.log(error.code, error.message);
                const userDetails = { ...user }
                userDetails.error = error.message;
                setUser(userDetails);
                setLoggedInUser(userDetails);
            });
    };


    const loginSubmit = values => {
        console.log(values);

        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                var user = userCredential.user;
                var { displayName, email } = userCredential.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                setUser(userDetails);
                setLoggedInUser(userDetails);
                history.replace(from);
                console.log('signinuser', user);
            })
            .catch((error) => {
                console.log(error.code, error.message);
                const userDetails = { ...user }
                userDetails.error = error.message;
                setUser(userDetails);
                setLoggedInUser(userDetails);
            });
    };

    const updateUserName = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('Update successful.');
        }).catch(function (error) {
            console.log(error.code, error.message);
        });
    }

    console.log('3', user);


    return (
        <Container className='login-menu'>
            <Header></Header>
            {
                option === 'login' &&
                <div className="signIn-area">

                    <h3 className='form-title'> Login</h3>

                    <form onSubmit={handleSubmit(loginSubmit)}>
                        <input
                            name="email"
                            placeholder="Email"
                            className='form-control'
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                        <p style={{ color: 'red' }}>{errors.email && errors.email.message}</p>

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className='form-control'
                            ref={register({
                                required: "Reuired",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })}
                        />
                        <p style={{ color: 'red' }}>{errors.password && <span>{errors.password.message}</span>}</p>

                        <p style={{ color: 'red' }}> {user.error} </p>

                        <button type="submit" className='btn col form-btn'>Login</button>
                    </form>

                    <p className='optional-option'>Don’t have an account?  <button onClick={() => setoption('signup')}>Create an account</button> </p>

                </div>
            }

            {
                option === 'signup' &&
                <div className="signUp-area">
                    <h3 className='form-title'> Create an account</h3>

                    <form onSubmit={e => e.preventDefault()}>

                        <input name="name"
                            placeholder="Name"
                            className='form-control'
                            ref={register({ required: true })} />
                        <p style={{ color: 'red' }}>{errors.name && "Reuired"}</p>

                        <input
                            name="email"
                            placeholder="Email"
                            className='form-control'
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "invalid email address"
                                }
                            })}
                        />
                        <p style={{ color: 'red' }}> {errors.email && errors.email.message}</p>

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className='form-control'
                            ref={register({
                                required: "You must specify a password",
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })}
                        />
                        <p style={{ color: 'red' }}>{errors.password && <span>{errors.password.message}</span>}</p>

                        <input
                            name="password_repeat"
                            type="password"
                            placeholder="Confirm Password"
                            className='form-control'
                            ref={register({
                                validate: value =>
                                    value === password.current || "The passwords do not match"
                            })}
                        />
                        <p style={{ color: 'red' }}> {errors.password_repeat && <span>{errors.password_repeat.message}</span>}</p>

                        <p style={{ color: 'red' }}> {user.error} </p>

                        <input type="submit" onClick={handleSubmit(signupSubmit)} className='btn col form-btn' value='Create an account' />
                    </form>
                    <p className='optional-option'>Already have an account?  <button onClick={() => setoption('login')}>Login</button> </p>

                </div>
            }

            <div className="social-login-option">
                <p className='or'>Or</p>

                <button onClick={fbSignIn}>
                    <span className='icon'><FontAwesomeIcon className='fb' icon={faFacebook} /></span> <span className='social-text'>Continue with Facebook</span>
                </button>
                <button onClick={googleSignIn}>
                    <span className='icon'><FontAwesomeIcon className='google' icon={faGoogle} /></span> <span className='social-text'>Continue with Google</span>
                </button>

            </div>

        </Container>
    );
};

export default Login;