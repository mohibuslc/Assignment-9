import React, { useContext } from 'react';
import Header from '../Header/Header';
import './Home.css';
import fakeData from '../../fakeData/data.json';
import { Container, Row } from 'react-bootstrap';
import RideDetails from '../RideDetails/RideDetails';
import { useHistory } from 'react-router';
import { UserContext } from './../../App';

const Home = () => {

    let history = useHistory();
    let[rideInfo, setRideInfo] = useContext(UserContext);
    let ridein = {...rideInfo}
    const handleRide = (rideName,id) => {
        history.push(`/destination/${rideName}/${id}`);
        ridein.name = rideName;
        ridein.id = id;
        setRideInfo(ridein)
    }

    return (
        <div className='bg-banner'>
            <Header></Header>
            
            <Container className='home-area'>
                <Row>
                    {
                        fakeData.map(rides => <RideDetails rides={rides} handleRide={handleRide} key={rides.id} />)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Home;