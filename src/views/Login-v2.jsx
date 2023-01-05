import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import logo from '../assets/img/login/logo.png';
import sideImage from '../assets/img/login/login-page-side-img.png';
import HelloWorldImg from '../assets/img/login/Hello_World_.png';
import TrajetImg from '../assets/img/login/Trajet_png.png';
import { login } from "../api/auth"
import { useHistory } from 'react-router-dom';

const Login = () => {
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
   <Col xs="12" md="6" style={{ "height": "100vh" }}>
    <span style={{
     "position": "relative"
    }}>
     <img style={{
      "position": "absolute",
      left: "40%",
      top: "5%",
      width: "110px"
     }} src={logo} alt="Logo"
     />
     <span style={{
      "position": "absolute",
      left: "25%",
      bottom: "10%",
     }} >
      <img src={HelloWorldImg}
       style={{
        width: "320px"
       }}
       alt="Logo"
      />
      <div style={{
       "backgroundColor": "transparent",
       "color": "#E85B38",
       "fontSize": "20px",
       "fontWeight": "400",
       "marginLeft": "20px"
      }}>
       Lorem, ipsum dolor sit amet
      </div>
     </span>
     <img
      className='d-none d-md-block'
      style={{ height: "100%", objectFit: 'cover' }}
      src={sideImage}
      alt=""
     />
    </span>
   </Col>
   <Col xs="12" md="6" style={{
    width: "100%",
    height: "100%",
    position: "relative"
   }}>
    <Card style={{
     position: "absolute",
     top: "10%",
     left: "15%",
     "width": "500px",
     "height": "600px",
    }}>
     <CardBody>
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
     </CardBody>
    </Card>
   </Col>
  </Row>
 </div>
}

export default Login;