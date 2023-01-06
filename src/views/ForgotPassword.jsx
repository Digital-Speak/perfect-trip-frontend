import React, { useState } from 'react';
import { Row, Col, Card } from 'reactstrap';
import logo from '../assets/img/login/logo.png';
import HelloWorldImg from '../assets/img/login/Hello_World_.png';
import { login } from "../api/auth"
import { useHistory } from 'react-router-dom';
import styles from '../assets/css/views/forgotPassword.module.scss';

const ForgotPassword = () => {
  const { push } = useHistory()
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [globalError, setGlobalError] = useState('');

  const validate = () => {
    let isError = false;

    if (!email) {
      setEmailError('Please enter your email');
      isError = true;
    } else {
      setEmailError('');
    }
    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
      //to do
      // const payload = await login({ email, password })
      // if (!payload?.success) {
      //   setGlobalError("Email incorrect.")
      // } else {
      //   setGlobalError('');
      //   push('/auth/login');
      // }
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
        <Card className={styles.forgotCard} >
          <div className={styles.forgotCardBody}>
              <p className={styles.title}>Forgot password?</p>
              <p className={styles.subtitle}>
              Did you forget your password? No problem.
               Just enter the email address associated with your account,
                and we'll send you a link to reset your password.
              </p>
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

              {globalError ? <div className={styles.error}>{globalError}</div> : null}

              <input onClick={handleSubmit} type="button" value="Send" className={styles.button} />
              <div className={styles.trajetImg}></div>

          </div>
        </Card>
      </Col>
    </Row>
  </div>
}

export default ForgotPassword;