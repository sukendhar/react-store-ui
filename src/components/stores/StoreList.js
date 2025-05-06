import React, { useEffect, useState } from 'react';
import {Button, Container, Alert, Spinner, Col, Card, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        listStores();
    }, []);

    const listStores = async () => {
        try {
            const response = await api.get('/stores');
            setStores(response.data);
        } catch (err) {
            setError('Error in getting the stores list');
        } finally {
            setLoading(false);
        }
    };

    const DeleteStore = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/stores/${id}`);
            setStores((prev) => prev.filter((store) => store.id !== id));
        } catch (err) {
            setError('Failed to delete store');
        }
    };

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <Container className="mt-4">
            <h2>Stores List</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" className="mb-3" onClick={() => navigate('/stores/new')}>
                Add Store
            </Button>
            {stores.length === 0 ? (
                <p>No stores found.</p>
            ) : (
                <Row xs={1} md={4} className="g-4">
                    {stores.map((store) => (
                        <Col key={store.id}>
                            <Card style={{ height: '200px' }}>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{store.name}</Card.Title>
                                    <Card.Text className="mb-2">
                                        {store.address}
                                    </Card.Text>

                                    <div className="mt-auto">
                                        <Button
                                            variant="success"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/stores/${store.id}`)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/stores/${store.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => DeleteStore(store.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default StoreList;