import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import profilePic from '../../assets/img/image_place_holder_male.jpeg';

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
                    <label>{t("Name")}</label>
                    <p>{user && user?.name}</p>
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("Email")}</label>
                    <p>{user && user?.email}</p>
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("created-at")}</label>
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