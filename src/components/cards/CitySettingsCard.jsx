import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
  Form
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { getCities } from "api/city";
import { TextField } from "@mui/material";

function CitySettingsCard({ action }) {

  const { t } = useTranslation();
  const [error, setError] = useState({
    add: null,
    edit: null,
    delete: null
  });

  const [cities, setCities] = useState([]);
  const [editCity, setEditCity] = useState({
    id:null,
    name:null,
  });
  const [str, setStr] = useState("");
  
  const loadData = async () => {
    const data = await getCities();
    if (data?.success) {
      setCities(data?.cities)
    }
  }
console.log(editCity)
  useEffect(() => {
    loadData();
  }, [])
  console.log(cities);
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
          </Card> :
          action === "edit" ?
            <Card >
              <CardHeader>
                <CardTitle tag="h5">{t("edit-city-name")}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="6">
                      <FormGroup>
                        <label>{t("choose-city")}</label>
                        <select 
                        className="form-control form-select" 
                        style={{ "height": "55px" }}
                        onChange={(event)=>{
                          setEditCity({
                            ...editCity,
                            id: event.target.value
                          });
                        }}
                         aria-label="Default select example">
                          {cities?.length !==0 && cities.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col className="" md="6">
                      <FormGroup>
                        <label>{t("change-city-name")}</label>
                        <Input
                          defaultValue=""
                          value={editCity?.name}
                          id="refClient"
                          style={{ "height": "55px" }}
                          type="text"
                          onChange={(event) => { 
                            setEditCity({
                              ...editCity,
                              name: event.target.value
                            })
                          }}
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
            </Card> :
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