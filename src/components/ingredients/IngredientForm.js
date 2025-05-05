import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../../services/api';

const IngredientForm = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();

    const [ingredient, setIngredient] = useState({
        name: '',
        quantity: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

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
            await api.post(`/items/${itemId}/ingredients`, ingredient);
            setSuccess('Ingredient added successfully');
            setIngredient({ name: '', quantity: '' });
            setTimeout(() => navigate(`/items/${itemId}`), 1500);
        } catch (err) {
            setErrors({ submit: 'Error in add ingredient' });
        }
    };

    return (
        <Container className="mt-4">
            <h2>Add Ingredient</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Ingredient Name*</Form.Label>
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
                    Add Ingredient
                </Button>
            </Form>
        </Container>
    );
};

export default IngredientForm;