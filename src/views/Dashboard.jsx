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
import { message } from 'antd';
import cats from "../assets/data/cats.json";
import PaxNumber from "../components/Tables/Pax-Number";
import HomeTable from "../components/Tables/HomeTable";
import { useTranslation } from 'react-i18next';
import { getCircuit, postData } from "../api/dashboard";
import { getAgencies } from "../api/agency";
import { getlastId } from "../api/auth";
import { addNewDossier } from "../api/dossier";
import { getCities } from "api/city";

function Dashboard() {
  const { t } = useTranslation();
  const [circuitsServerData, setCircuitsServerData] = useState([]);
  const [agencesServerData, setAgencesServerData] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [agences, setAgencies] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [circuit, setCircuit] = useState([]);
  const [newHotelToDb, setNewHotelToDb] = useState([]);
  const [typeOfHb, setTypeOfHb] = useState([]);
  const [flights, setFlights] = useState({
    from_to_start: "APT / HOTEL",
    city_id_start: 0,
    from_start: "AEROPORT CASABLANCA",
    to_start: "ODYSSEE CENTER",
    flight_start: "AT 410",
    flight_time_start: "06:30",
    from_to_end: "HOTEL / APT",
    city_id_end: 0,
    from_end: "PALM PLAZA",
    to_end: "Aeroport Marrakech",
    flight_end: "ZF 2850",
    flight_time_end: "10:20",
    flight_date_start: new Date(),
    flight_date_end: new Date(),
  });
  const [newClient, setNewClient] = useState({
    agency: {
      name: null,
      id: null
    },
    circuit: {
      name: null,
      id: null
    },
    cat: {
      name: null,
      id: null
    },
    nbrPax: 0,
    startDate: null,
    endDate: null,
    extraNights: 0,
    extraData: []
  });
  const [messageApi, contextHolder] = message.useMessage();

  const loadData = async () => {
    // Get the folder Num:
    await clearInputs();
    const data_cities = await getCities();
    setCities(data_cities?.cities);
    const payload_1 = await getCircuit();
    const payload_2 = await getAgencies();
    if (!payload_1?.success) return;
    if (!payload_2?.success) return;
    setCircuitsServerData(payload_1?.circuits);
    setAgencesServerData(payload_2?.agencies);
    const newData = { "agenciesData": [], "circuitsData": [] };
    payload_1.circuits.forEach((item) => {
      newData.circuitsData.push({
        label: item.name
      })
    });

    payload_2.agencies.forEach((item) => {
      newData.agenciesData.push({
        label: item.name
      })
    });

    setAgencies(newData?.agenciesData);
    setCircuits(newData?.circuitsData);
    setFlights((prev) => (
      {
        ...prev,
        city_id_end: data_cities?.cities[0].id,
        city_id_start: data_cities?.cities[0].id
      }
    ))
  }

  const clearInputs = async () => {
    // Get the folder Num:
    const folderNumber = await getlastId();
    setNewClient({
      folderNumber: folderNumber?.success ? folderNumber?.dossier_num : "ERROR",
      refClient: "",
      fullName: "",
      agency: {
        name: null,
        id: null
      },
      circuit: {
        name: null,
        id: null
      },
      cat: {
        name: null,
        id: null
      },
      nbrPax: 0,
      startDate: null,
      endDate: null,
      extraNights: 0,
      typeOfHb: [],
      note: null,
      extraData: []
    });
  }

  const fetchHotels = async (circ, cat) => {
    const payload = await postData("hotel/circuit_city_hotels", "POST", {
      id: circ,
      cat: cat
    });

    if (!payload.success) return;
    setHotels([]);

    setHotels(payload.hotels);
  }

  useEffect(() => {
    if (circuit.length === 0) loadData();
  }, []);

  useEffect(() => {
    if (newClient?.circuit !== "" && newClient?.cat !== "") {
      fetchHotels(newClient?.circuit?.id, newClient?.cat?.id);
    }
  }, [newClient?.circuit, newClient?.cat]);

  useEffect(() => {
    let totalNbrPax = 0;
    typeOfHb.forEach((item) => totalNbrPax = totalNbrPax + item.nbr);
    setNewClient({ ...newClient, nbrPax: totalNbrPax, typeOfHb: typeOfHb })
  }, [typeOfHb]);

  return (
    <>
      {contextHolder}
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
                          value={newClient?.folderNumber}
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
                          value={newClient?.agency?.name}
                          clearOnEscape
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            const agencyId = agencesServerData.filter((item) => item.name === newInputValue);
                            if (agencyId.length !== 0)
                              setNewClient({ ...newClient, agency: { name: newInputValue, id: agencyId[0].id } })

                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Client-Ref")}</label>
                        <Input
                          defaultValue=""
                          value={newClient?.refClient}
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
                          value={newClient?.circuit?.name}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={async (event, newInputValue) => {
                            const circuitId = circuitsServerData.filter((item) => item.name === newInputValue);
                            if (circuitId.length !== 0)
                              setNewClient({ ...newClient, circuit: { name: newInputValue, id: circuitId[0].id } });
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
                          value={newClient?.cat?.name}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({
                              ...newClient,
                              cat: {
                                name: newInputValue,
                                id: newInputValue === "5 ⭐ L" ? "L" : newInputValue === "4 ⭐ A" ? "A" : "B"
                              }
                            })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("FullName")}</label>
                        <Input
                          value={newClient?.fullName}
                          style={{ "height": "55px" }}
                          id="fullName"
                          type="text"
                          onChange={(event) => {
                            setNewClient({ ...newClient, fullName: event.target.value })
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="4">
                      <label>{t("From")}</label>
                      <FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={newClient?.startDate}
                            inputFormat={"DD/MM/YYYY"}
                            onChange={(newValue) => {
                              const newDate = new Date(newValue.$d);
                              setFlights({
                                ...flights,
                                flight_date_start: newDate
                              })
                              setNewClient({ ...newClient, startDate: newDate })
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                        </LocalizationProvider>
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <label>{t("To")}</label>
                      <FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disabled
                            value={newClient?.endDate}
                            inputFormat={"DD/MM/YYYY"}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                          />
                        </LocalizationProvider>
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Pax-Number")}</label>
                        <Input
                          value={newClient?.nbrPax}
                          disabled
                          style={{ "height": "55px" }}
                          id="nbrPax"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, nbrPax: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="12">
                      <FormGroup>
                        <label>{t("Note")}</label>
                        <textarea
                          value={newClient?.note}
                          style={{ "height": "80px", width: "100%", borderColor: "lightgray" }}
                          id="note"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, note: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="12">
                      <FormGroup>
                        <label>{t("Type-HB")}</label>
                        <PaxNumber cb={(data) => {
                          setTypeOfHb(data);
                        }} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <HomeTable
                        circuitDates={{ start: newClient?.startDate, end: newClient?.endDate }}
                        setNewClient={setNewClient}
                        newClient={newClient}
                        selectedCircuit={newClient?.circuit}
                        t={t}
                        cities={cities}
                        flights={flights}
                        setFlights={setFlights}
                        hotels={hotels}
                        circuit={circuit}
                        setCircuit={setCircuit}
                        addNewHotel={(newHotel, cityId) => {
                          setNewHotelToDb([...newHotelToDb, { newHotel }])
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto d-flex">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={async () => {
                          try {
                            const hotels_dossier = [];
                            circuit.forEach((item) => {
                              const hotels_dossier_item = hotels.filter((hotel) => hotel.cityName === item.city && hotel.hotelName === item.selectedHotel);
                              hotels_dossier.push({
                                dossier_num: newClient.folderNumber,
                                hotel_id: hotels_dossier_item[0].hotelId,
                                extra_nights: newClient.extraNights,
                                from: item.fromForServer,
                                to: item.toForServer
                              })
                            });

                            if (
                              newClient?.folderNumber === "ERROR" ||
                              newClient?.refClient === null ||
                              newClient?.fullName === null ||
                              newClient?.cat?.id === null ||
                              newClient?.circuit?.id === null ||
                              newClient?.startDate === null ||
                              newClient?.endDate === null ||
                              newClient?.typeOfHb === null ||
                              newClient?.agency?.id === null ||
                              newClient?.nbrPax === null ||
                              hotels_dossier.length === null
                            ) {

                              return messageApi.open({
                                type: 'error',
                                content: t("Please fill all the inputs"),
                              });
                            }

                            const payload = await addNewDossier({
                              dossier_num: newClient.folderNumber,
                              ref_client: newClient.refClient,
                              name: newClient.fullName,
                              category: newClient.cat.id,
                              starts_at: newClient.startDate,
                              ends_at: newClient.endDate,
                              agency_id: newClient.agency.id,
                              circuit_id: newClient.circuit.id,
                              hotels_dossier: hotels_dossier,
                              typeOfHb: newClient.typeOfHb,
                              nbrPax: newClient?.nbrPax,
                              note: newClient.note,
                              extraData: newClient.extraData,
                              ...flights
                            });

                            if (payload?.success) {
                              messageApi.open({
                                type: 'success',
                                content: t("Folder has been added successfully"),
                              });
                              clearInputs();
                              window.scroll({
                                top: 0,
                                behavior: 'smooth'
                              });
                            } else {
                              messageApi.open({
                                type: 'error',
                                content: t("An Error has accuired please try again"),
                              });
                            }
                          } catch (error) {
                            messageApi.open({
                              type: 'error',
                              content: t("An Error has accuired please try again"),
                            });
                            console.error(error);
                          }
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
