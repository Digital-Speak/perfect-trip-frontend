import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import logo from '../assets/img/logo.png'; // import your logo image
import sideImage from '../assets/img/login-page.jpg'; // import your side image
import { login } from "../api/login"
import { useHistory } from 'react-router-dom';

const LoginComponent = () => {
  const { push } = useHistory()
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
      const payload = await login({ email, password })
      if (!payload?.success) {
        setGlobalError("Email or assword incorrect.")
      } else {
        setGlobalError('');
        sessionStorage.setItem('jat', payload?.token);
        push('/admin/dashboard');
      }
    }
  };

  return <div>
   <Row>
      <Col xs="12" md="6" className='p-5' style={{display:"flex",flexDirection:"column",  alignItems:"center"}}>
        <img style={{
          width:"200px"
        }} src={logo} alt="Logo" />
        <Form className='w-100' onSubmit={handleSubmit}>
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
      <Col xs="12" md="6" style={{height:"100vh"}}>
        <img className='d-none d-md-block'   style={{height:"100%",objectFit:'cover',borderTopLeftRadius:"20%", borderBottomLeftRadius:"20%"}} src={sideImage} alt="Side image" />
      </Col>
    </Row>
  </div>
}

export default LoginComponent;