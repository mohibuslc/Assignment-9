import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from './../../App';

const PrivateRouteResult = ({children, ...rest}) => {
    const [rideInfo, setRideInfo, loggedinUser, setLoggedInUser] = useContext(UserContext);
    const { email } = loggedinUser;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRouteResult;