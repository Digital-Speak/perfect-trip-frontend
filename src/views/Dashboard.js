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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import agences from "../assets/data/agences.json";
import cats from "../assets/data/cats.json";
import typesHAB from "../assets/data/typesHAB.json";
import HomeTable from "../components/Tables/Home-table";
import { useTranslation } from 'react-i18next';
import { getCircuit, postData } from "../api/dashboard";


function Dashboard() {
  const [circuitsServerData, setCircuitsServerData] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [newClient, setNewClient] = useState({
    folderNumber: Date.now(),
    refClient: "D2291",
    fullName: "Jhon Doe",
    agency: "",
    circuit: "",
    cat: "L",
    typeHAB: "",
    nbrPax: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const loadData = async () => {
    const payload = await getCircuit();
    if (!payload.success) return;
    setCircuitsServerData(payload.circuits);
    const newData = [];
    payload.circuits.forEach((item)=> {
      newData.push({
        label: item.name
      })
    });

    setCircuits(newData);
  }

  const fetchHotels = async (circ, cat) => {
    const payload = await postData("hotel/circuit_city_hotels", "POST", {
      id: circ,
      cat
    });

    if(!payload.success) return;
    setHotels(payload.hotels)
  }

  useEffect(() => {
    if (circuits.length === 0) loadData();
  }, [circuits]);

  useEffect(() => {
    if (newClient.circuit !== "" && newClient.cat !== ""){
      fetchHotels(circuitsServerData.filter((item) => item.name === newClient.circuit)[0].id, newClient.cat);
      
    } 
  }, [newClient.circuit, newClient.cat]);

  const { t } = useTranslation();
  return (
    <>
      <div className="content" style={{ "width": "90%", "justifyContent": "center", "marginLeft": "auto", "marginRight": "auto" }}>
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">{t("New-Folder")}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Folder-Number")}</label>
                        <Input
                          defaultValue=""
                          value={newClient.folderNumber}
                          disabled
                          style={{ "height": "55px" }}
                          id="firstname"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, folderNumber: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Agency")}</label>
                        <Autocomplete
                          disablePortal
                          options={agences}
                          sx={{ width: "auto" }}
                          inputValue={newClient.agency}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, agency: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Client-Ref")}</label>
                        <Input
                          defaultValue=""
                          value={newClient.refClient}
                          id="refClient"
                          style={{ "height": "55px" }}
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, refClient: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Circuit")}</label>
                        <Autocomplete
                          disablePortal
                          id="circuit"
                          options={circuits}
                          sx={{ width: "auto" }}
                          inputValue={newClient.circuit}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={async (event, newInputValue) => {
                            setNewClient({ ...newClient, circuit: newInputValue });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Cat")}</label>
                        <Autocomplete
                          disablePortal
                          id="cat"
                          options={cats}
                          sx={{ width: "auto" }}
                          inputValue={newClient.cat}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, cat: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("FullName")}</label>
                        <Input
                          value={newClient.fullName}
                          style={{ "height": "55px" }}
                          id="fullName"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, fullName: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Type-HB")}</label>
                        <Autocomplete
                          disablePortal
                          id="typeHAB"
                          options={typesHAB}
                          sx={{ width: "auto" }}
                          inputValue={newClient.typeHAB}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, typeHAB: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <label> {t("Period")}</label>
                      <Row>
                        <Col className="" md="6">
                          <FormGroup>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label={t("From")}
                                value={newClient.startDate}
                                inputFormat={"DD/MM/YYYY"}
                                onChange={(newValue) => {
                                  const newDate = new Date(newValue.$d);
                                  console.log(newDate);
                                  setNewClient({ ...newClient, startDate: newDate })
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </FormGroup>
                        </Col>
                        <Col className="" md="6">
                          <FormGroup>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label={t("To")}
                                disabled
                                value={newClient.endDate}
                                inputFormat={"DD/MM/YYYY"}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label> {t("Pax-Number")}</label>
                        <Input
                          value={newClient.nbrPax}
                          style={{ "height": "55px" }}
                          id="nbrPax"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, nbrPax: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <HomeTable circuitDates={{ start: newClient.startDate, end: newClient.endDate }} setNewClient={setNewClient} newClient={newClient} selectedCircuit={newClient.circuit} t={t} hotels={hotels} />
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
                      <Button
                        className="btn-round"
                        color="danger"
                        onClick={() => {

                        }}
                      >
                        {t("Cancel")}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
