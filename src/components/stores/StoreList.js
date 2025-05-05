import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    const storeDelete = async (id) => {
        if (!window.confirm('Are you sure to delete?')) return;
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
            {stores.length === 0 ? (
                <p>No stores found.</p>
            ) : (
                <Table striped bordered hover>
                    <tbody>
                    {stores.map((store) => (
                        <tr key={store.id}>
                            <td><h3>{store.name}</h3><br/><i>{store.address}</i></td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => storeDelete(store.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default StoreList;