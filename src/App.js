
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import DestinationSearch from './components/Destination/DestinationSearch';
import SearchResult from './components/SearchResult/SearchResult';
import { createContext, useState } from 'react';
import Login from './Login/Login';
import PrivateRouteDestination from './components/PrivateRouteDestination/PrivateRouteDestination';
import PrivateRouteResult from './components/PrivateRouteResult/PrivateRouteResult';


export const UserContext = createContext();

function App() {

  const [rideInfo, setRideInfo] = useState({
    name: 'car',
    id: 2,
    rent: 67,
    user: 4
  });
  console.log('rideInfo', rideInfo);
  const [loggedinUser, setLoggedInUser] = useState({})
  console.log('loggedinuser', loggedinUser);

  return (
    <UserContext.Provider value={[rideInfo, setRideInfo, loggedinUser, setLoggedInUser]}>

      <Router>

        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>

          <Route path='/home'>
            <Home></Home>
          </Route>

          {/* <PrivateRoute path='/destination/:rideName/:rideId'>
            <DestinationSearch></DestinationSearch>
          </PrivateRoute> */}
          <PrivateRouteDestination path='/destination/:rideName/:rideId'>
            <DestinationSearch></DestinationSearch>
          </PrivateRouteDestination>

          <PrivateRouteResult path='/result'>
            <SearchResult></SearchResult>
          </PrivateRouteResult>

          <Route path='/login'>
            <Login></Login>
          </Route>

          <PrivateRouteDestination path='/destination/'>
            <DestinationSearch></DestinationSearch>
          </PrivateRouteDestination>

        </Switch>

      </Router>

    </UserContext.Provider>
  );
}

export default App;
