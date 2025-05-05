import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const StoreForm = () => {
    const [store, setStore] = useState({ name: '', address: '', description: '' });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!store.name) newErrors.name = 'Name is required';
        if (!store.address) newErrors.address = 'Address is required';
        if (!store.description) newErrors.description = 'Description is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            await api.post('/stores', store);
            setSuccess('Store created successfully');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setErrors({ submit: 'Error in creating a create store' });
        }
    };

    return (
        <Container className="mt-4">
            <h2>Create New Store</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3" controlId="storeName">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={store.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="storeAddress">
                    <Form.Label>Address*</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={store.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="storeDescription">
                    <Form.Label>Description*</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={store.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default StoreForm;
