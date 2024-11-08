import React, { useState } from 'react';
import { Row, Col, Card } from 'reactstrap';
import logo from '../../assets/img/login/logo.png';
import HelloWorldImg from '../../assets/img/login/Hello_World_.png';
import { forgotPassword } from "../../api/auth"
import { useHistory } from 'react-router-dom';
import styles from '../../assets/css/views/forgotPassword.module.scss';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const { t } = useTranslation();
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
      // TODO:
      const payload = await forgotPassword({ email })
      if (!payload?.success && payload?.message === "There is no user with that email address") {
        setGlobalError(t("Email incorrect."));
      } else if (payload?.message === "An email has been sent") {
        alert("An email has been sent.");
        setGlobalError('');
        push('/auth/login');
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
        <Card className={styles.forgotCard} >
          <div className={styles.forgotCardBody}>
            <p className={styles.title}>{t("Forgot password?")}</p>
            <p className={styles.subtitle}>{t('Forgot password text')}</p>
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
            <div className={styles.hyperLinksRow}>
              <input
                onClick={() => {
                  push('/auth/login')
                }}
                type="button" value={t("Back to login")} className={styles.hyperLink} />
            </div>
            <input onClick={handleSubmit} type="button" value={t("send")} className={styles.button} />
            <div className={styles.trajetImg}></div>

          </div>
        </Card>
      </Col>
    </Row>
  </div>
}

export default ForgotPassword;