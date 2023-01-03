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
import { editCityApi, addCityApi } from "api/city";
import { deleteCityApi } from "api/city";

function CitySettingsCard({ action }) {

  const { t } = useTranslation();
  const [error, setError] = useState({
    add: null,
    edit: null,
    delete: null
  });
  const [cities, setCities] = useState([]);
  const [addCity, setAddCity] = useState('');
  const [deleteCity, setDeleteCity] = useState(null);
  const [editCity, setEditCity] = useState({
    id: null,
    name: null,
  });

  const resetStates = () => {
    setError({
      add: null,
      edit: null,
      delete: null
    });
    setEditCity({
      id: null,
      name: "",
    });
    setAddCity('');
  }

  const loadData = async () => {
    const data = await getCities();
    if (data?.success) {
      setEditCity({
        name: "",
        id: data?.cities[0]?.id
      });
      setDeleteCity(data?.cities[0]?.id);
      setCities(data?.cities);
    }
  }

  const handleEdit = async () => {
    if (editCity?.name && editCity?.name !== "") {
      const data = await editCityApi(editCity);
      if (data?.success) {
        alert("City updated successfully.");
        resetStates();
        loadData();
      }
    } else {
      setError({
        ...error,
        edit: "Please provide a correct city name."
      })
    }
  }

  const handleDelete = async () => {
    if (deleteCity) {
      const data = await deleteCityApi({id: deleteCity});
      if (data?.success) {
        alert("City deleted successfully.");
        resetStates();
        loadData();
      }
    } else {
      setError({
        ...error,
        delete: "An error occured"
      })
    }
  }

  const handleAdd = async () => {
    if (addCity && addCity !== "") {
      const data = await addCityApi({name:addCity});
      if (data?.success) {
        alert("City added successfully.");
        resetStates();
        loadData();
      }else{
        setError({
          ...error,
          add: "Please provide a correct city name."
        })
      }
    } else {
      setError({
        ...error,
        add: "Please provide a correct city name."
      })
    }
  }

  useEffect(() => {
    loadData();
  }, [])

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
                        value={addCity}
                        id="refClient"
                        style={{ "height": "55px" }}
                        type="text"
                        onChange={(event) => { setAddCity(event.target.value) }}
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
                          handleAdd()
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
                          onChange={(event) => {
                            setEditCity({
                              ...editCity,
                              id: event.target.value
                            });
                          }}
                          aria-label="Default select example">
                          {cities?.length !== 0 && cities.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                        </select>
                        {error?.edit && <label className="text-danger">{error?.edit}</label>}

                      </FormGroup>
                    </Col>
                    <Col className="" md="6">
                      <FormGroup>
                        <label>{t("change-city-name")}</label>
                        {console.log(editCity.name)}
                        <Input
                          defaultValue={editCity.name}
                          value={editCity.name}
                          id="refClienst"
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
                          handleEdit()
                        }}
                      >
                        {t("edit")}
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
                  <Col className="" md="8">
                    <FormGroup>
                      <label>{t("choose-city")}</label>
                      <select
                        className="form-control form-select"
                        style={{ "height": "55px" }}
                        onChange={(event) => {
                          setDeleteCity(event.target.value);
                        }}
                        aria-label="Default select example">
                        {cities?.length !== 0 && cities.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                      </select>
                      {error?.delete && <label className="text-danger">{error?.delete}</label>}

                    </FormGroup>
                  </Col>
                  <Col className="" md="4">
                    <FormGroup>
                      <label></label>
                      <Button
                        className="btn btn-block"
                        color="primary"
                        onClick={() => {
                          handleDelete()
                        }}
                      >
                        {t("delete")}
                      </Button>
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

export default CitySettingsCard;