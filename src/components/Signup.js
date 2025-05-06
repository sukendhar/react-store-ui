import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Signup() {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState({ email: '', password: '', passwordConfirmation: '' });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!data.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Enter a valid email';
        }
        if (!data.password) newErrors.password = 'Password is required';
        if (!data.passwordConfirmation) {
            newErrors.passwordConfirmation = 'Please confirm your password';
        } else if (data.password !== data.passwordConfirmation) {
            newErrors.passwordConfirmation = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleChange = e => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
            await signup(data.email, data.password, data.passwordConfirmation);
            navigate('/');
        } catch (err) {
            const resp = err.response?.data;
            if (Array.isArray(resp?.errors)) {
                setSubmitError(resp.errors.join(', '));
            } else {
                setSubmitError(resp?.error || 'Signup failed');
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Sign Up</Card.Title>

                            {submitError && <Alert variant="danger">{submitError}</Alert>}

                            <Form noValidate onSubmit={formSubmit}>
                                <Form.Group controlId="signupEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="signupPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="signupPasswordConfirm" className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="passwordConfirmation"
                                        value={data.passwordConfirmation}
                                        onChange={handleChange}
                                        isInvalid={!!errors.passwordConfirmation}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.passwordConfirmation}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}