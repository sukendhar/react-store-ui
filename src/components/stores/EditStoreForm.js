import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const EditStoreForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [store, setStore] = useState({ name: '', address: '', description: '' });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStore = async () => {
            try {
                const response = await api.get(`/stores/${id}`);
                setStore(response.data);
            } catch (err) {
                setErrors({ fetch: 'Error in loading store details' });
            } finally {
                setLoading(false);
            }
        };

        getStore();
    }, [id]);

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
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await api.put(`/stores/${id}`, store);
            setSuccess('Store updated successfully');
            setTimeout(() => navigate(`/stores/${id}`), 1500);
        } catch (err) {
            setErrors({ submit: 'Error in updating store' });
        }
    };

    if (loading) return <Spinner className="m-5" animation="border" />;

    return (
        <Container className="mt-4">
            <h2>Edit Store</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {errors.fetch && <Alert variant="danger">{errors.fetch}</Alert>}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={store.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={store.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={store.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Container>
    );
};

export default EditStoreForm;