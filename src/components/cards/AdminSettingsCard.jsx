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

function AdminSettingsCard({action}) {

  const { t } = useTranslation();

  return (
    <div>
      {
        action === "add" ?
        <Card >
        <CardHeader>
          <CardTitle tag="h5">{t("add-admin")}</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col className="" md="4">
                <FormGroup>
                  <label>{t("admin-name")}</label>
                  <Input
                    defaultValue=""
                    value=""
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => { }}
                  />
                </FormGroup>
              </Col>
              <Col className="" md="4">
                <FormGroup>
                  <label>{t("admin-email")}</label>
                  <Input
                    defaultValue=""
                    value=""
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => { }}
                  />
                </FormGroup>
              </Col>
              <Col className="" md="4">
                <FormGroup>
                  <label>{t("admin-password")}</label>
                  <Input
                    defaultValue=""
                    value=""
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => { }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <div className="update ml-auto mr-auto d-flex">
                <Button
                  className="btn-round"
                  color="primary"
                  onClick={() => {
  
                  }}
                >
                  {t("Save")}
                </Button>
              </div>
            </Row>
          </Form>
        </CardBody>
      </Card>:
       action === "edit" ?
          <Card >
          <CardHeader>
            <CardTitle tag="h5">{t("edit-admin")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("admin-name")}</label>
                    <Input
                      defaultValue=""
                      value=""
                      id="refClient"
                      style={{ "height": "55px" }}
                      type="text"
                      onChange={(event) => { }}
                    />
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("admin-email")}</label>
                    <Input
                      defaultValue=""
                      value=""
                      id="refClient"
                      style={{ "height": "55px" }}
                      type="text"
                      onChange={(event) => { }}
                    />
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("admin-password")}</label>
                    <Input
                      defaultValue=""
                      value=""
                      id="refClient"
                      style={{ "height": "55px" }}
                      type="text"
                      onChange={(event) => { }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <div className="update ml-auto mr-auto d-flex">
                  <Button
                    className="btn-round"
                    color="primary"
                    onClick={() => {
    
                    }}
                  >
                    {t("Save")}
                  </Button>
                </div>
              </Row>
            </Form>
          </CardBody>
        </Card>:
         <Card >
         <CardHeader>
           <CardTitle tag="h5">{t("delete-admin")}</CardTitle>
         </CardHeader>
         <CardBody>
           <Form>
             <Row>
               <Col className="" md="4">
                 <FormGroup>
                   <label>{t("admin-name")}</label>
                   <Input
                     defaultValue=""
                     value=""
                     id="refClient"
                     style={{ "height": "55px" }}
                     type="text"
                     onChange={(event) => { }}
                   />
                 </FormGroup>
               </Col>
               <Col className="" md="4">
                 <FormGroup>
                   <label>{t("admin-email")}</label>
                   <Input
                     defaultValue=""
                     value=""
                     id="refClient"
                     style={{ "height": "55px" }}
                     type="text"
                     onChange={(event) => { }}
                   />
                 </FormGroup>
               </Col>
               <Col className="" md="4">
                 <FormGroup>
                   <label>{t("admin-password")}</label>
                   <Input
                     defaultValue=""
                     value=""
                     id="refClient"
                     style={{ "height": "55px" }}
                     type="text"
                     onChange={(event) => { }}
                   />
                 </FormGroup>
               </Col>
             </Row>
             <Row>
               <div className="update ml-auto mr-auto d-flex">
                 <Button
                   className="btn-round"
                   color="primary"
                   onClick={() => {
   
                   }}
                 >
                   {t("Save")}
                 </Button>
               </div>
             </Row>
           </Form>
         </CardBody>
       </Card>
      }

    </div>

  )
}

export default AdminSettingsCard;