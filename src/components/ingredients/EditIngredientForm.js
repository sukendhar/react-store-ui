import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const EditIngredientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ingredient, setIngredient] = useState({ name: '', quantity: '' });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getIngredient();
    }, []);

    const getIngredient = async () => {
        try {
            const res = await api.get(`/ingredients/${id}`);
            setIngredient({
                name: res.data.name,
                quantity: res.data.quantity
            });
        } catch (err) {
            setErrors({ fetch: 'Error in load ingredient details' });
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!ingredient.name) newErrors.name = 'Name is required';
        if (!ingredient.quantity) newErrors.quantity = 'Quantity is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setIngredient({ ...ingredient, [e.target.name]: e.target.value });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await api.put(`/ingredients/${id}`, ingredient);
            setSuccess('Ingredient updated successfully');
            setTimeout(() => navigate(-1), 1500);
        } catch (err) {
            setErrors({ submit: 'Error in update ingredient' });
        }
    };

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <Container className="mt-4">
            <h2>Edit Ingredient</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {errors.fetch && <Alert variant="danger">{errors.fetch}</Alert>}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={ingredient.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity*</Form.Label>
                    <Form.Control
                        type="text"
                        name="quantity"
                        value={ingredient.quantity}
                        onChange={handleChange}
                        isInvalid={!!errors.quantity}
                    />
                    <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Ingredient
                </Button>
            </Form>
        </Container>
    );
};

export default EditIngredientForm;