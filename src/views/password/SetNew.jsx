import React, { useState } from 'react';
import { Row, Col, Card } from 'reactstrap';
import logo from '../../assets/img/login/logo.png';
import HelloWorldImg from '../../assets/img/login/Hello_World_.png';
import { saveNewPassword } from "../../api/auth"
import { useHistory } from 'react-router-dom';
import styles from '../../assets/css/views/forgotPassword.module.scss';
import { useTranslation } from 'react-i18next';

const SetNewPassword = (props) => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [newPassword, setNewPassword] = useState('');
  const [reTypeNewPassword, setReTypeNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [globalError, setGlobalError] = useState('');


  const validate = () => {
    let isError = false;

    if (newPassword === "" || reTypeNewPassword === "") {
      setEmailError(t("Fill-All-Password-Inputs"));
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
      const payload = await saveNewPassword({
        password: newPassword,
        token: props.match.params.token
      })
      if (!payload?.success) {
        setGlobalError("Email incorrect.");
      } else if (payload?.success) {
        alert("Password changed successfully.")
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
            <p className={styles.title}>{t("Set-New-Password")}</p>
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                type="password"
                name="password"
                id="password"
                placeholder={t("New-Password")}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                type="password"
                name="password"
                id="password"
                placeholder={t("ReType-New-Password")}
                value={reTypeNewPassword}
                onChange={(e) => {
                  setReTypeNewPassword(e.target.value)
                  if (e.target.value !== newPassword) {
                    setGlobalError(t("Password-Dont-Match"))
                  } else {
                    setGlobalError('')
                  }
                }
                }
              />
            </div>
            {globalError ? <div className={styles.error}>{globalError}</div> : null}
            <input style={{ width: "50%" }} onClick={handleSubmit} type="button" value={t("Save")} className={styles.button} />
              <div className={styles.trajetImg}></div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
}

export default SetNewPassword;