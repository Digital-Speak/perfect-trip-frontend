import React, { useState } from 'react';
import { Row, Col, Card } from 'reactstrap';
import logo from '../assets/img/login/logo.png';
import HelloWorldImg from '../assets/img/login/Hello_World_.png';
import { login } from "../api/auth"
import { useHistory } from 'react-router-dom';
import styles from '../assets/css/views/login.module.scss';

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

  return <div className='container-fluid h-100'>
    <Row>
      <Col xs="12" md="6" className={styles.leftSide} >
      <div className={styles.logo}>
          <img alt='logo' src={logo} />
        </div>
        <div className={styles.text}>
          <img alt='hello world' src={HelloWorldImg} />
        </div>
      </Col>
      <Col xs="12" md="6" className={styles.rightSide}>
        <Card className={styles.loginCard} >
          <div className={styles.loginCardBody}>
              <p className={styles.title}>LOGIN</p>
              <div className={styles.inputRow}>
                
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              {emailError ? <div className={styles.error}>{emailError}</div> : null}
              <div className={styles.inputRow}>
               
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder='password'
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              {passwordError ? <div className={styles.error}>{passwordError}</div> : null}
              {globalError ? <div className={styles.error}>{globalError}</div> : null}

              <div className={styles.hyperLinksRow}>
                <input
                onClick={()=>{
                  push('/auth/forgotpassword')
                }}
                 type="button" value="Forgot my password?" className={styles.hyperLink} />
              </div>
              <input onClick={handleSubmit} type="button" value="LOGIN" className={styles.button} />
              <div style={{width:"100%",height:"100px"}}>
              <div className={styles.trajetImg}></div>
              </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
}

export default Login;