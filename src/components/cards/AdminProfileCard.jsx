import React, { useState, } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Row,
  Col
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import profilePic from '../../assets/img/person-icon.png';

function AdminProfileCard() {

  const [user] = useState(JSON.parse(sessionStorage.getItem('user')));
  const { t } = useTranslation();

  return (
    <div>
      {
        <Card >
          <CardHeader>
            <CardTitle tag="h5">{t("Profile")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md="4"></Col>
                <Col md="4">
                  <img src={profilePic} alt="profile" style={{borderRadius:"50%", width:"300px"}} />

                </Col>
                <Col md="4"></Col>
              </Row>
              <Row className="mt-5">
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("name")}</label>
                    <p>{user && user?.name}</p>
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("email")}</label>
                    <p>{user && user?.email}</p>
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("Added-at")}</label>
                    <p>{user && user?.created_at}</p>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      }

    </div>

  )
}

export default AdminProfileCard;