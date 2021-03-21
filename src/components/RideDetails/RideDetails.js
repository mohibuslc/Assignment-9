import React from 'react';
import './RideDetails.css';
import { Card, Col } from 'react-bootstrap';

const RideDetails = ({rides, handleRide}) => {
    const { rideName, image, id } = rides;
    return (
        <Col md={3} sm={6}>
            <Card onClick={() => handleRide(rideName,id)} className='my-3'>
                <Card.Body>
                    <Card.Img variant="top" src={image} />
                    <Card.Title>{rideName}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default RideDetails;