import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const EditItemForm = () => {
    const { id } = useParams(); // item ID
    const navigate = useNavigate();

    const [item, setItem] = useState({ name: '', price: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await api.get(`/items/${id}`);
                setItem({
                    name: response.data.name,
                    price: response.data.price,
                    description: response.data.description
                });
            } catch (err) {
                setErrors({ fetch: 'Error in load item details' });
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

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
            await api.put(`/items/${id}`, item);
            setSuccess('Item updated successfully');
            setTimeout(() => navigate(-1), 1500);
        } catch (err) {
            setErrors({ submit: 'Error in update item' });
        }
    };

    if (loading) return <Spinner animation="border" className="m-5" />;

    return (
        <Container className="mt-4">
            <h2>Edit Item</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {errors.fetch && <Alert variant="danger">{errors.fetch}</Alert>}
            {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}

            <Form onSubmit={formSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
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
                    <Form.Label>Price</Form.Label>
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
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update Item
                </Button>
            </Form>
        </Container>
    );
};

export default EditItemForm;