import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const IngredientView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ingredient, setIngredient] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getIngredient();
    }, []);

    const getIngredient = async () => {
        try {
            const res = await api.get(`/ingredients/${id}`);
            setIngredient(res.data);
        } catch (err) {
            setError('Error in loading ingredient');
        } finally {
            setLoading(false);
        }
    };

    const DeleteIngredient = async () => {
        const confirm = window.confirm('Are you sure you want to delete this ingredient?');
        if (!confirm) return;

        try {
            await api.delete(`/ingredients/${id}`);
            navigate(-1);
        } catch (err) {
            setError('Error in delete ingredient');
        }
    };

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <Container className="mt-4">
            <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
                Back
            </Button>

            {error && <Alert variant="danger">{error}</Alert>}

            {ingredient && (
                <Card>
                    <Card.Body>
                        <Card.Title>{ingredient.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Quantity: {ingredient.quantity}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            )}
            <div className="mt-2">
                <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    onClick={() => navigate(`/ingredients/${ingredient.id}/edit`)}
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={DeleteIngredient}
                >
                    Delete
                </Button>
            </div>
        </Container>
    );
};

export default IngredientView;