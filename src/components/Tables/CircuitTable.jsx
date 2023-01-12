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
import _ from "lodash"
import { useTranslation } from "react-i18next";
import CustomEditableSelect from "components/Inputs/CustomEditableSelect";
import EditableInput from "../Inputs/EditableInput";
import EditableSelect from "components/Inputs/EditableSelect";
import { message } from "antd";
import { getCiruitsApi, addCiruitsApi } from "api/circuit_city";
import { getCities } from "api/city";
import { getCircuit } from "api/dashboard";

function CircuitTable() {
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [circuitData, setCircuitData] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [newCircuit, setNewCircuit] = useState({
    circuit_id: -1,
    city_id: -1,
    cat: "L",
    number_of_nights: 0,
  });

  const loadData = async () => {
    const _cities = await getCities();
    const circuitsData = await getCircuit();
    const dataCircuits = await getCiruitsApi();
    setNewCircuit({
      circuit_id: dataCircuits?.circuits_cities[0]?.id,
      cat: "L",
      city_id: _cities?.cities[0]?.id,
      number_of_nights: 0,
    })
    setCities(_cities?.cities);
    setCircuitData(circuitsData?.circuits);
    setCircuits(dataCircuits?.circuits_cities);
    const data = dataCircuits?.circuits_cities;
    let grouped = _.mapValues(_.groupBy(data, 'circuit_id'), clist => clist.map(data => _.omit(data, 'circuit_id')));
    setCircuits(grouped);
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

  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {
    loadData();
  }, []);

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Add-Circuit")}</CardTitle>
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
                      setNewCircuit({ ...newCircuit, circuit_id: event?.target?.value })
                    }} name="" id="">
                    {circuitData?.map((item) => (
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
                      setNewCircuit({ ...newCircuit, city_id: event?.target?.value })
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
                      setNewCircuit({ ...newCircuit, number_of_nights: event?.target?.value })
                    }}
                    style={{ height: "54px", display: "flex", flexDirection: "column", justifyContent: "center" }} />
                </FormGroup>
              </Col>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label style={{ opacity: 0 }}>.</label>
                  <Button onClick={async () => {
                    try {
                      if (newCircuit.cat === "" || newCircuit.circuit_id === -1 || newCircuit.city_id === -1) {
                        await handleAdd();
                        messageApi.open({
                          type: 'success',
                          content: t("The circuit has been added successfully"),
                        });
                      } else {
                        messageApi.open({
                          type: 'error',
                          content: t("Please fill all the inputs"),
                        });
                      }
                    } catch (error) {
                      messageApi.open({
                        type: 'error',
                        content: t("An error has occurred, please try later"),
                      });
                    }
                  }} className='btn btn-block bg-info text-white border-0' style={{ "height": "53px" }}>{t("Add")}</Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        {circuits && circuits?.length !== 0 && Object.keys(circuits).map((key) => (
          <Card>
            <CardHeader>
              <CardTitle tag="h4">{circuits[key][0]?.circuit}</CardTitle>
            </CardHeader>
            <CardBody>
              <Table
                responsive
                striped
                style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}
              >
                <thead className="text-primary">
                  <tr>
                    <th style={{ "textAlign": "left" }}>{t("city")}</th>
                    <th style={{ "textAlign": "left" }}>{t("hotel")}</th>
                    <th style={{ "textAlign": "left" }}>{t("cat")}</th>
                    <th style={{ "textAlign": "center" }}>{t("number_of_nights")}</th>
                  </tr>
                </thead>
                <tbody>
                  {circuits[key] && circuits[key]?.length !== 0 && circuits[key].map((item) => (
                    <tr>
                      <td style={{ "textAlign": "left" }}>{item?.city}</td>
                      <td style={{ "textAlign": "left" }}>{item?.hotel}</td>
                      <td style={{ "textAlign": "left" }}>{item?.cat}</td>
                      <td style={{ "textAlign": "center" }}>{item?.number_of_nights}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        ))}
      </Col>
    </Row>
  );
}

export default CircuitTable;
