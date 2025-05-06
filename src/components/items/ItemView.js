import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Table, Spinner, Alert, Button } from 'react-bootstrap';
import api from '../../services/api';

const ItemView = () => {
    const { id } = useParams(); // item id
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getItemDetails();
    }, []);

    const getItemDetails = async () => {
        try {
            const itemRes = await api.get(`/items/${id}`);
            const ingredientRes = await api.get(`/items/${id}/ingredients`);

            setItem(itemRes.data);
            setIngredients(ingredientRes.data);
        } catch (err) {
            setError('Error in load item or ingredients');
        } finally {
            setLoading(false);
        }
    };

    const DeleteIngredient = async (ingredientId) => {
        const confirm = window.confirm('Are you sure you want to delete this ingredient?');
        if (!confirm) return;

        try {
            await api.delete(`/ingredients/${ingredientId}`);
            setIngredients(ingredients.filter((ingredient) => ingredient.id !== ingredientId));
        } catch (err) {
            alert('Error in delete ingredient');
        }
    };

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <Container className="mt-4">
            <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
                Back
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}

            {item && (
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">${item.price}</Card.Subtitle>
                        <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                </Card>
            )}

            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4>Ingredients</h4>
                <Button variant="primary" onClick={() => navigate(`/items/${id}/ingredients/new`)}>
                    Add Ingredient
                </Button>
            </div>

            {ingredients.length === 0 ? (
                <p>No ingredients found.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredients.map((ingredient) => (
                        <tr key={ingredient.id}>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.quantity}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="success"
                                    className="me-2"
                                    onClick={() => navigate(`/ingredients/${ingredient.id}`)}
                                >
                                    View
                                </Button>
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
                                    onClick={() => DeleteIngredient(ingredient.id)}
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

export default ItemView;