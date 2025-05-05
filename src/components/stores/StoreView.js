import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Table, Button, Alert, Spinner } from 'react-bootstrap';
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
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
            <Button onClick={() => navigate('/')}>Back</Button>
        </Container>
    );
};

export default StoreView;