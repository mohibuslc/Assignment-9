import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header';
import './SearchResult.css';
import { UserContext } from './../../App';
import fakeData from '../../fakeData/data.json';
import mapImage from '../../image/Map.png';

const SearchResult = () => {

    const [rideInfo, setRideInfo, loggedinUser, setLoggedInUser] = useContext(UserContext);
    let { from, to, name, date, time, id, rent, user } = rideInfo;
    console.log('res', from, to, name, id);

    let findRide = fakeData?.find(data => data.id === id);
    let image = findRide?.image;
    rent = findRide?.rent;
    user = findRide?.user;

    return (
        <div className='searchResult-area'>
            <Header></Header>

            <Container>
                <hr className='horizontal-line' />

                <Row>
                    <Col md={5}>
                        <div className="result-area form-area">
                            <div className="placeNames">
                                <h3>{from}</h3>
                                <h3>{to}</h3>
                                <p>Date: {date} <span className='ml-3'> Time: {time}</span></p>
                            </div>
                            <div className="details">
                                <div className="content">
                                    <img src={image} alt="img" />
                                    <p>{name}</p>
                                    <p> <span className='user-icon'><FontAwesomeIcon icon={faUserFriends} /></span> {user}</p>
                                </div>
                                <p>${rent}</p>
                            </div>
                            <div className="details">
                                <div className="content">
                                    <img src={image} alt="img" />
                                    <p>{name}</p>
                                    <p> <span className='user-icon'><FontAwesomeIcon icon={faUserFriends} /></span> {user}</p>
                                </div>
                                <p>${rent}</p>
                            </div>
                            <div className="details">
                                <div className="content">
                                    <img src={image} alt="img" />
                                    <p>{name}</p>
                                    <p> <span className='user-icon'><FontAwesomeIcon icon={faUserFriends} /></span> {user}</p>
                                </div>
                                <p>${rent}</p>
                            </div>

                        </div>
                    </Col>

                    <Col md={7}>
                        <div className="map">
                            <img src={mapImage} alt="" className='img-fluid' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SearchResult;