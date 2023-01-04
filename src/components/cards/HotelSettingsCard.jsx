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
import { editHotelApi } from "api/hotel";
import { deleteHotelApi } from "api/hotel";
import { addHotelApi } from "api/hotel";
import { getHotels } from "api/hotel";
import { getCities } from "api/city";

function HotelSettingsCard({ action }) {

  const { t } = useTranslation();
  const [error, setError] = useState({
    add: null,
    edit: null,
    delete: null
  });
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [addHotel, setAddHotel] = useState('');
  const [deleteHotel, setDeleteHotel] = useState(null);
  const [hotelStars, setHotelStars] = useState('5L');
  const [cityId, setCityId] = useState(null);
  const [editHotel, setEditHotel] = useState({
    id: null,
    name: null,
  });

  const resetStates = () => {
    setError({
      add: null,
      edit: null,
      delete: null
    });
    setEditHotel({
      id: null,
      name: "",
    });
    setAddHotel('');
  }

  const loadData = async () => {
    const cities = await getCities();
    if (cities?.success) {
      setCityId(cities?.cities[0]?.id);
      setCities(cities?.cities);
    }
    const data = await getHotels();
    if (data?.success) {
      setEditHotel({
        name: data?.hotels[0]?.name,
        id: data?.hotels[0]?.id
      });
      setDeleteHotel(data?.hotels[0]?.id);
      setHotels(data?.hotels);
    }
  }

  const handleEdit = async () => {
    if (editHotel?.name && editHotel?.name !== "") {
      const data = await editHotelApi({ id: editHotel?.id, name: editHotel?.name, city_id: cityId, });
      if (data?.success) {
        alert("Hotel updated successfully.");
        resetStates();
        loadData();
      }
    } else {
      setError({
        ...error,
        edit: "Please provide a correct hotel name."
      })
    }
  }

  const handleDelete = async () => {
    if (deleteHotel) {
      const data = await deleteHotelApi({ id: deleteHotel });
      if (data?.success) {
        alert("Hotel deleted successfully.");
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
    if (addHotel && addHotel !== "") {
      console.log(hotelStars);
      const data = await addHotelApi({ city_id: cityId, name: addHotel, stars: hotelStars });
      if (data?.success) {
        alert("Hotel added successfully.");
        resetStates();
        loadData();
      } else {
        setError({
          ...error,
          add: "Please provide a correct hotel name."
        })
      }
    } else {
      setError({
        ...error,
        add: "Please provide a correct hotel name."
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
              <CardTitle tag="h5">{t("add-hotel")}</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="" md="4">
                    <FormGroup>
                      <label>{t("hotel-name")}</label>
                      <Input
                        value={addHotel}
                        id="refClient"
                        style={{ "height": "55px" }}
                        type="text"
                        onChange={(event) => { setAddHotel(event.target.value) }}
                      />
                      {error?.add && <label>{error?.add}</label>}

                    </FormGroup>
                  </Col>
                  <Col className="" md="4">
                    <FormGroup>
                      <label>{t("choose-city")}</label>
                      <select
                        className="form-control form-select"
                        style={{ "height": "55px" }}
                        onChange={(event) => { setCityId(event.target.value); }}
                        aria-label="Default select example">
                        {cities?.length !== 0 && cities.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col className="" md="4">
                    <FormGroup>
                      <label>{t("hotel-stars")}</label>
                      <select
                        className="form-control form-select"
                        style={{ "height": "55px" }}
                        onChange={(event) => { setHotelStars(event.target.value); }}
                        aria-label="Default select example">
                        {['5L', '4A', '4B'].map((element, index) => <option value={element} className="form-check-input" key={index}>{element}</option>)}
                      </select>
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
                <CardTitle tag="h5">{t("edit-hotel")}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("choose-hotel")}</label>
                        <select
                          className="form-control"
                          style={{ "height": "55px" }}
                          onChange={(event) => {
                            setEditHotel({
                              ...editHotel,
                              id: event.target.value
                            });
                          }}
                          aria-label="Default select example">
                          {hotels?.length !== 0 && hotels.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                        </select>
                        {error?.edit && <label className="text-danger">{error?.edit}</label>}
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("hotel-name")}</label>
                        {console.log(editHotel.name)}
                        <Input
                          defaultValue={editHotel.name}
                          value={editHotel.name}
                          id="refClienst"
                          style={{ "height": "55px" }}
                          type="text"
                          onChange={(event) => {
                            setEditHotel({
                              ...editHotel,
                              name: event.target.value
                            })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("hotel-city")}</label>
                        <select
                          className="form-control form-select"
                          style={{ "height": "55px" }}
                          onChange={(event) => { setCityId(event.target.value); }}
                          aria-label="Default select example">
                          {cities?.length !== 0 && cities.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                        </select>
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
                <CardTitle tag="h5">{t("delete-hotel")}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="8">
                      <FormGroup>
                        <label>{t("choose-hotel")}</label>
                        <select
                          className="form-control form-select"
                          style={{ "height": "55px" }}
                          onChange={(event) => {
                            setDeleteHotel(event.target.value);
                          }}
                          aria-label="Default select example">
                          {hotels?.length !== 0 && hotels.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                        </select>
                        {error?.delete && <label className="text-danger">{error?.delete}</label>}

                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label></label>
                        <Button
                          className="btn btn-block"
                          color="danger"
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

export default HotelSettingsCard;