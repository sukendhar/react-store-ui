import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Container, Card, Button, Alert, Spinner, Row, Col} from 'react-bootstrap';
import api from '../../services/api';

const StoreView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [store, setStore] = useState(null);
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStoreAndItems();
    }, []);

    const getStoreAndItems = async () => {
        try {
            const storeRes = await api.get(`/stores/${id}`);
            const itemsRes = await api.get(`/stores/${id}/items`);
            setStore(storeRes.data);
            setItems(itemsRes.data);
        } catch (err) {
            setError('Error in loading store or items');
        } finally {
            setLoading(false);
        }
    };

    const DeleteItem = async (itemId) => {
        const confirm = window.confirm('Are you sure you want to delete this item?');
        if (!confirm) return;

        try {
            await api.delete(`/items/${itemId}`);
            setItems(items.filter((item) => item.id !== itemId));
        } catch (err) {
            alert('Error in delete item');
        }
    };

    if (loading) return <Spinner className="m-5" animation="border" />;

    return (
        <Container className="mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            {store && (
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>{store.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{store.address}</Card.Subtitle>
                        <Card.Text>{store.description}</Card.Text>
                    </Card.Body>
                </Card>
            )}

            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4>Items</h4>
                <Button variant="primary" onClick={() => navigate(`/stores/${id}/items/new`)}>
                    Add Item
                </Button>
            </div>

            {items.length === 0 ? (
                <p>No items available for this store.</p>
            ) : (
                <Row xs={1} md={4} className="g-4">
                    {items.map((item) => (
                        <Col key={item.id}>
                            <Card style={{ height: '300px' }}>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text className="text-truncate-multiline mb-2">
                                        {item.description}
                                    </Card.Text>

                                    <div className="mt-auto">
                                        <Card.Title className="mb-3">${item.price}</Card.Title>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/items/${item.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => DeleteItem(item.id)}
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
            <Button onClick={() => navigate('/')}>Back</Button>
        </Container>
    );
};

export default StoreView;