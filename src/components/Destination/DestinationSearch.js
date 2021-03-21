import React, { useContext, useState } from 'react';
import './DestinationSearch.css';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import mapImage from '../../image/Map.png';
import { useHistory } from 'react-router-dom';
import { UserContext } from './../../App';
import { useForm } from 'react-hook-form';


const DestinationSearch = () => {

    const [rideInfo, setRideInfo] = useContext(UserContext);

    let history = useHistory();

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
        const placeInfo = { ...rideInfo };
        placeInfo.from = values.from;
        placeInfo.to = values.to;
        placeInfo.date = values.date;
        placeInfo.time = values.time;
        setRideInfo(placeInfo);
        history.push('/result');
    };

    return (
        <div className='destination-area py-3'>
            <Header></Header>
            <Container>
                <hr className='horizontal-line' />

                <Row>
                    <Col md={5}>
                        <div className="form-area">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>Pick From</label>
                                <input
                                    name='from'
                                    type='text'
                                    className='form-control'
                                    ref={register({
                                        required: "Required"
                                    })}
                                />
                                <p style={{ color: 'red' }}>{errors.from && errors.from.message}</p>

                                <label className='mt-4 d-block'>Pick To</label>
                                <input
                                    name='to'
                                    type='text'
                                    className='form-control'
                                    ref={register({
                                        required: "Required"
                                    })}
                                />
                                <p style={{ color: 'red' }}>{errors.to && errors.to.message}</p>

                                <label className='mt-4 d-block'>Date</label>
                                <input
                                    name='date'
                                    type='date'
                                    className='form-control'
                                    ref={register({
                                        required: "Required"
                                    })}
                                />
                                <p style={{ color: 'red' }}>{errors.date && errors.date.message}</p>

                                <label className='mt-4 d-block'>Time</label>
                                <input
                                    name='time'
                                    type='time'
                                    className='form-control'
                                    ref={register({
                                        required: "Required"
                                    })}
                                />
                                <p style={{ color: 'red' }}>{errors.time && errors.time.message}</p>

                                <button type="submit" className='btn col mt-4'> Search Result</button>
                            </form>

                        </div>
                    </Col>

                    <Col md={7}>
                        <div className="map">
                            <img src={mapImage} alt="" className='img-fluid' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default DestinationSearch;

