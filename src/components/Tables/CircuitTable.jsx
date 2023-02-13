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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import _ from "lodash"
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { getCiruitsApi, addCiruitsApi } from "api/circuit_city";
import { addCiruitApi } from "api/circuit";
import { getCities } from "api/city";
import { getCircuit } from "api/dashboard";

function CircuitTable() {
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [circuitData, setCircuitData] = useState([]);
  const [circuitData_, setCircuitData_] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [circuitsBackUp, setCircuitsBackUp] = useState([]);
  const [newCircRecord, setNewCircRecord] = useState({
    name: "",
  });

  const [newCircuit, setNewCircuit] = useState({
    circuit_id: -1,
    city_id: -1,
    cat: "L",
    number_of_nights: 1,
  });

  const loadData = async () => {
    const _cities = await getCities();
    const circuitsData = await getCircuit();
    const dataCircuits = await getCiruitsApi();
    setNewCircuit({
      ...newCircuit,
      city_id: _cities?.cities[0]?.id,
      number_of_nights: 1,
    });

    setCities(_cities?.cities);

    setCircuitData_(circuitsData?.circuits);

    const dataAPP = []
    circuitsData?.circuits.forEach((item) => {
      dataAPP.push({ label: item?.name });
    });

    setCircuitData(dataAPP);
    setCircuits(dataCircuits?.circuits_cities);

    const data = dataCircuits?.circuits_cities;
    data.map((item) => item.show = false)
    let grouped = _.mapValues(_.groupBy(data, 'circuit_id'), clist => clist.map(data => _.omit(data, 'circuit_id')));
    setCircuits(grouped);
    setCircuitsBackUp(grouped);
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
      {contextHolder}
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Add-Circuit")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("Circuits")}:
                    <span style={{
                      marginLeft: "5px",
                      fontWeight: "bolder",
                      fontSize: "12px",
                      fontStyle: "italic"
                    }}>
                      {newCircRecord?.name !== "" ? t('New') : ""}
                    </span>
                  </label>
                  <Autocomplete
                    freeSolo
                    id="circuit"
                    options={circuitData}
                    sx={{ width: "auto" }}
                    value={newCircuit.circuit_name}
                    renderInput={(params) => <TextField {...params} label={t("Select")} />}
                    onInputChange={async (event, newInputValue) => {
                      const exist = circuitData_.filter((item) => item.name === newInputValue);
                      if (exist.length !== 0) {
                        setNewCircuit({ ...newCircuit, circuit_id: exist[0]?.id, circuit_name: exist[0]?.name })
                        setNewCircRecord({
                          name: ""
                        });
                      } else {
                        setNewCircRecord({
                          name: newInputValue
                        });
                      }
                    }}
                  />
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
                      <option value={item.id} key={item.id}>{item.name}</option>
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
                    min={1}
                    onChange={(event) => {
                      if (event?.target?.value === "") return;
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
                      if (newCircRecord.name !== "" && newCircRecord.name !== undefined) {
                        const newCirc = await addCiruitApi({
                          name: newCircRecord.name
                        });

                        if (newCirc?.success === true && newCirc?.message === "Circuit added successfully") {
                          if (newCirc?.circuit[0].id === -1
                            || newCircuit.city_id === -1
                            || newCircuit.number_of_nights === 0
                            || newCircuit.number_of_nights <= 0
                            || newCircuit.number_of_nights === ""
                          ) return messageApi.open({
                            type: 'error',
                            content: t("Please fill all the inputs"),
                          });

                          const data = await addCiruitsApi({
                            circuit_id: newCirc?.circuit[0].id,
                            city_id: newCircuit.city_id,
                            number_of_nights: newCircuit.number_of_nights,
                          });

                          if (data?.success) {
                            messageApi.open({
                              type: 'success',
                              content: t("The circuit has been added successfully"),
                            });
                            setNewCircRecord("");
                            setNewCircuit({
                              ...newCircuit,
                              circuit_id: newCirc?.circuit[0].id,
                              circuit_name: newCirc?.circuit[0].name,
                            });

                            await loadData();
                          }
                        }
                      } else {
                        if (
                          newCircuit.circuit_id !== -1
                          && newCircuit.city_id !== -1
                          && newCircuit.number_of_nights !== ""
                          && newCircuit.number_of_nights !== 0
                          && newCircuit.number_of_nights > 0
                        ) {
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
          <Card key={key}>
            <CardHeader>
              <CardTitle tag="h4" style={{
                "display": "flex",
                "justifyContent": "space-between",
                "cursor": "pointer",
                "paddingTop": "5px",
                "paddingBottom": "15px",
              }}
                onClick={() => {
                  const data = [];
                  circuits[key].forEach((item) => {
                    data.push({
                      ...item,
                      show: !item.show
                    })
                  })
                  setCircuits(_.values({ ...circuits, [key]: data }));
                }}
              >
                <span>{circuits[key][0]?.circuit}</span>
                <span>
                  {circuits[key][0]?.show ? <i className="fas fa-chevron-down mr-4"></i> : <i className="fas fa-chevron-up mr-4"></i>}
                </span>
              </CardTitle>
            </CardHeader>
            {circuits[key][0]?.show ? <CardBody>
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
                  {circuits[key] && circuits[key]?.length !== 0 && circuits[key].map((item, index) => (
                    <tr key={index}>
                      <td style={{ "textAlign": "left" }}>{item?.city}</td>
                      <td style={{ "textAlign": "left" }}>{item?.hotel}</td>
                      <td style={{ "textAlign": "left" }}>{item?.cat}</td>
                      <td style={{ "textAlign": "center" }}>{item?.number_of_nights}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody> :
              <></>
            }
          </Card>
        ))}
      </Col>
    </Row>
  );
}

export default CircuitTable;
