import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import logo from '../assets/img/apple-icon.png'; // import your logo image
import sideImage from '../assets/img/bg5.jpg'; // import your side image
import { login } from "../api/login"
import { useHistory,push } from 'react-router-dom';
import { setAccessToken } from 'helpers/accessToken';

const LoginComponent= () => {
  const {push}=useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [globalError, setGlobalError] = useState('');

  const validate = () => {
    let isError = false;

    if (!email) {
      setEmailError('Please enter your email');
      isError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      isError = true;
    } else {
      setPasswordError('');
    }

    return isError;
  };
  console.log("login")
  const handleSubmit = async (e) => {
    e.preventDefault();


    const err = validate();

    if (!err) {
      // handle successful login here
      const payload = await login("user/login", "POST", { email, password })

      if (!payload?.success) {
        setGlobalError("Email or assword incorrect.")
      } else {
        setGlobalError('')
        setAccessToken(payload?.token)
      }
    }
  };


  return <Container>
      <Row>
        <Col xs="12" sm="6">
          <img src={logo} alt="Logo" />
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError ? <div className="error">{emailError}</div> : null}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError ? <div className="error">{passwordError}</div> : null}
            </FormGroup>
            {globalError ? <div className="error">{globalError}</div> : null}

            <Button color="primary">Login</Button>
          </Form>
        </Col>
        <Col xs="12" sm="6">
          <img src={sideImage} alt="Side image" />
        </Col>
      </Row>
    </Container>
  
}

export default LoginComponent;