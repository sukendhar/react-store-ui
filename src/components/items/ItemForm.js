import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ItemForm = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState({
        name: '',
        price: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!item.name) newErrors.name = 'Name is required';
        if (!item.price) newErrors.price = 'Price is required';
        if (!item.description) newErrors.description = 'Description is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await api.post(`/stores/${storeId}/items`, item);
            setSuccess('Item created successfully');
            setTimeout(() => navigate(`/stores/${storeId}`), 1500);
        } catch (err) {
            setErrors({ submit: 'Error in create item' });
        }
    };

    return (
        <Container className="mt-4">
            <h2>Add Item to Store</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Item Name*</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price*</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description*</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Item
                </Button>
            </Form>
        </Container>
    );
};

export default ItemForm;