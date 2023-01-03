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

function CitySettingsCard({action}) {

  const { t } = useTranslation();
 
  const [error, setError] = useState({
    add: null,
    edit: null,
    delete: null
  });

  return (
    <div>
      {
        action === "add" ?
        <Card >
        <CardHeader>
          <CardTitle tag="h5">{t("add-city")}</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col className="" md="8">
                <FormGroup>
                  <label>{t("city-name")}</label>
                  <Input
                    defaultValue=""
                    value=""
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => { }}
                  />
                  {error?.add && <label>{error?.add}</label>}
                  
                </FormGroup>
              </Col>
              <Col className="" md="4">
                <FormGroup>
                <label></label>
                <Button
                  className="btn btn-block"
                  color="primary"

                  onClick={() => {
                  }}
                >
                  {t("Save")}
                </Button>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            
            </Row>
          </Form>
        </CardBody>
      </Card>:
       action === "edit" ?
          <Card >
          <CardHeader>
            <CardTitle tag="h5">{t("edit-city")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("city-name")}</label>
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
                    <label>{t("city-email")}</label>
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
                    <label>{t("city-password")}</label>
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
           <CardTitle tag="h5">{t("delete-city")}</CardTitle>
         </CardHeader>
         <CardBody>
           <Form>
             <Row>
               <Col className="" md="4">
                 <FormGroup>
                   <label>{t("city-name")}</label>
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
                   <label>{t("city-email")}</label>
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
                   <label>{t("city-password")}</label>
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

export default CitySettingsCard;