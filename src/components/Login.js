import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate   = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors]           = useState({});
    const [submitError, setSubmitError] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!credentials.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            newErrors.email = 'Enter a valid email';
        }
        if (!credentials.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        setSubmitError('');
    };

    const formSubmit = async e => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            await login(credentials.email, credentials.password);
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.error || 'Login failed';
            setSubmitError(msg);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Log In</Card.Title>

                            {submitError && <Alert variant="danger">{submitError}</Alert>}

                            <Form noValidate onSubmit={formSubmit}>
                                <Form.Group controlId="loginEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="loginPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Log In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}