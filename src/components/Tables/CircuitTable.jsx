import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import { useTranslation } from "react-i18next";
import EditableInput from "../Inputs/EditableInput";
import { getHotels } from "api/hotel";
import { getCiruitsApi, addCiruitsApi } from "api/circuit_city";
import EditableSelect from "components/Inputs/EditableSelect";
import { getCities } from "api/city";
import { getCircuit } from "api/dashboard";
import CustomEditableSelect from "components/Inputs/CustomEditableSelect";

function CircuitTable() {
  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [circuitData, setCircuitData] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [newCircuit, setNewCircuit] = useState({
    circuit_id: -1,
    cat: "L",
    city_id: -1,
    number_of_nights: 0,
  });

  const loadData = async () => {
    const _hotels = await getHotels();
    const _cities = await getCities();
    const circuitsData = await getCircuit();
    const dataCircuits = await getCiruitsApi();
    setCircuits(dataCircuits?.circuits_cities);
    setCities(_cities?.cities);
    if (_cities?.cities.length !== 0) {
      const data = [];
      _hotels?.hotels.forEach((element, index) => {
        if (parseInt(element.city_id) === parseInt(_cities?.cities[0].id)) {
          data.push(element);
        }

        if (index === _hotels?.hotels.length - 1) {
          setHotels(data)
        }
      });
    }
    setCircuitData(circuitsData?.circuits);
  };

  const handleAdd = async () => {
    const data = await addCiruitsApi({
      circuit_id: newCircuit.circuit_id,
      city_id: newCircuit.city_id,
      number_of_nights: newCircuit.number_of_nights,
    });
    if (data?.success) {
      loadData();
    }
  };

  // const handleEdit = async (editCircuit) => {
  //     const data = await editCircuitApi(editCircuit);
  //     if (data?.success) {
  //       loadData();
  //     }   
  // };

  const handleDelete = async (deleteCircuit) => {
    // if (deleteCircuit) {
    //   const data = await deleteCircuitApi({ id: deleteCircuit });
    //   if (data?.success) {
    //     loadData();
    //   }
    // }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Add-city")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("Circuits")}</label>
                  <select
                    className="form-control"
                    style={{ height: "55px" }}
                    value={newCircuit.circuit_id}
                    onChange={(event) => {
                      setNewCircuit({ ...newCircuit, circuit_id: event.target.value })
                    }} name="" id="">
                    {circuitData.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("City")}</label>
                  <select
                    className="form-control"
                    style={{ height: "55px" }}
                    onChange={async (event) => {
                      setNewCircuit({ ...newCircuit, city_id: event.target.value })
                      const _hotels = await getHotels();
                      const data = [];

                      _hotels?.hotels.forEach((element, index) => {
                        if (parseInt(element.city_id) === parseInt(event.target.value)) {
                          data.push(element);
                        }

                        if (index === _hotels?.hotels.length - 1) {
                          setHotels(data);
                        }
                      });
                    }} name="" id="">
                    {cities?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("number_of_nights")}</label>
                  <Input
                    value={newCircuit.number_of_nights}
                    type="number"
                    onChange={(event) => {
                      setNewCircuit({ ...newCircuit, number_of_nights: event.target.value })
                    }}
                    style={{ height: "54px", display: "flex", flexDirection: "column", justifyContent: "center" }} />
                </FormGroup>
              </Col>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label style={{ opacity: 0 }}>.</label>
                  <Button onClick={() => {
                    handleAdd()
                  }} className='btn btn-block bg-info text-white border-0' style={{ "height": "53px" }}>Add</Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Circuits")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table
              responsive
              striped
              style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}
            >
              <thead className="text-primary">
                <tr>
                  <th style={{ "textAlign": "left" }}>{t("circuit")}</th>
                  <th style={{ "textAlign": "left" }}>{t("city")}</th>
                  <th style={{ "textAlign": "left" }}>{t("hotel")}</th>
                  <th style={{ "textAlign": "left" }}>{t("cat")}</th>
                  <th style={{ "textAlign": "center" }}>{t("number_of_nights")}</th>
                </tr>
              </thead>
              <tbody>
                {circuits.length !== 0 && circuits.map((item) => (
                  <tr>
                    <td style={{ "textAlign": "left" }}>{item.circuit}</td>
                    <td style={{ "textAlign": "left" }}>{item.city}</td>
                    <td style={{ "textAlign": "left" }}>{item.hotel}</td>
                    <td style={{ "textAlign": "left" }}>{item.cat}</td>
                    <td style={{ "textAlign": "center" }}>{item.number_of_nights}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default CircuitTable;
