import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  Form,
  Row,
  Col,
  Button,
  Modal
} from "reactstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import cats from "../../assets/data/cats.json";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCircuit, postData } from "../../api/dashboard";
import { getAgencies } from "../../api/agency";
import { updateDossier, getOneDossier } from "../../api/dossier";
import HomeTable from 'components/Tables/HomeTable';
import PaxNumber from 'components/Tables/Pax-Number';


function DefaultModal({ t, data, modalIsOpen, setIsOpen, selectedDossier, setSelectedDossier }) {
  const [editMode, seteditMode] = useState(true);
  const [circuitsServerData, setCircuitsServerData] = useState([]);
  const [agencesServerData, setAgencesServerData] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [agences, setAgencies] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [circuit, setCircuit] = useState([]);
  const [newHotelToDb, setNewHotelToDb] = useState([]);
  const [typeOfHb, setTypeOfHb] = useState([]);

  const [targetDossier, setTargetDossier] = useState({
    folderNumber: 1,
    refClient: "US-2031203420",
    fullName: "Jhon Doe",
    agency: {
      name: "EXOTICCA",
      id: 1
    },
    circuit: {
      name: "GRT",
      id: 1
    },
    cat: {
      name: "5 ⭐ L",
      id: "L"
    },
    nbrPax: 0,
    startDate: new Date(),
    endDate: new Date(),
    extraNights: 0,
    typeOfHb: typeOfHb,
    note: "Note !!!",
  });

  const loadData = async () => {
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
    if (circuits.length === 0) loadData();
  }, [circuits]);

  useEffect(() => {
    if (targetDossier.circuit !== "" && targetDossier.cat !== "")
      fetchHotels(targetDossier.circuit.id, targetDossier.cat.id);
  }, [targetDossier.circuit, targetDossier.cat]);

  useEffect(() => {
    let totalNbrPax = 0;
    typeOfHb.forEach((item) => totalNbrPax = totalNbrPax + item.nbr);
    setTargetDossier({ ...targetDossier, nbrPax: totalNbrPax, typeOfHb: typeOfHb })
  }, [typeOfHb]);

  const loadTargetDossier = async () => {
    const payload = await getOneDossier({ dossier_num: selectedDossier });
    if (!payload?.success) return false;
    // TODO handle error message
    if (payload?.data?.length !== 0) {
      setTargetDossier({
        folderNumber: payload?.data[0].dossierNum,
        refClient: payload?.data[0].client_ref,
        fullName: "Jhon Doe",
        agency: {
          name: payload?.data[0].agency,
          id: payload?.data[0].agency_id
        },
        circuit: {
          name: payload?.data[0].circuit,
          id: payload?.data[0].circuit_id
        },
        cat: {
          name:
            payload?.data[0] === "L" ? "5 ⭐ L" :
              payload?.data[0] === "A" ? "4 ⭐ A" :
                "4 ⭐ B",
          id: payload?.data[0].category
        },
        nbrPax: 0,
        startDate: payload?.data[0].startAt,
        endDate: payload?.data[0].endAt,
        extraNights: 0,
        typeOfHb: payload?.data[0].typeOfHb,
        note: payload?.data[0].note,
      })
    } else {
      setIsOpen(false);
      setSelectedDossier(-1);
    }
  }

  useEffect(() => {
    loadTargetDossier();
  }, []);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={{
          left: -100,
        }}
        toggle={() => {
          setIsOpen(false);
          setSelectedDossier(-1);
        }}
      >
        <Card style={{
          paddingTop: "15px",
          paddingBottom: "15px",
          width: "60vw",
          height: "auto",
        }}>
          <CardBody>
            <Form>
              <Row>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("Folder-Number")}</label>
                    <Input
                      defaultValue=""
                      value={targetDossier.folderNumber}
                      disabled
                      style={{ "height": "55px" }}
                      id="firstname"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("Agency")}</label>
                    <Autocomplete
                      disablePortal
                      options={agences}
                      disabled={!editMode}
                      sx={{ width: "auto" }}
                      inputValue={targetDossier.agency.name}
                      renderInput={(params) => <TextField {...params} label={t("Select")} />}
                      onInputChange={(event, newInputValue) => {
                        const agencyId = agencesServerData.filter((item) => item.name === newInputValue);
                        if (agencyId.length !== 0)
                          setTargetDossier({ ...targetDossier, agency: { name: newInputValue, id: agencyId[0].id } })

                      }}
                    />
                  </FormGroup>
                </Col>
                <Col className="" md="4">
                  <FormGroup>
                    <label>{t("Client-Ref")}</label>
                    <Input
                      defaultValue=""
                      disabled={!editMode}
                      value={targetDossier.refClient}
                      id="refClient"
                      style={{ "height": "55px" }}
                      type="text"
                      onChange={(event) => { setTargetDossier({ ...targetDossier, refClient: event.target.value }) }}
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
                      disabled={!editMode}
                      inputValue={targetDossier.circuit.name}
                      renderInput={(params) => <TextField {...params} label={t("Select")} />}
                      onInputChange={async (event, newInputValue) => {
                        const circuitId = circuitsServerData.filter((item) => item.name === newInputValue);
                        if (circuitId.length !== 0)
                          setTargetDossier({ ...targetDossier, circuit: { name: newInputValue, id: circuitId[0].id } });
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
                      defaultValue={targetDossier.cat.name}
                      disabled={!editMode}
                      inputValue={targetDossier.cat.name}
                      renderInput={(params) => <TextField {...params} label={t("Select")} />}
                      onInputChange={(event, newInputValue) => {
                        setTargetDossier({
                          ...targetDossier,
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
                      value={targetDossier.fullName}
                      style={{ "height": "55px" }}
                      disabled={!editMode}
                      id="fullName"
                      type="text"
                      onChange={(event) => { setTargetDossier({ ...targetDossier, fullName: event.target.value }) }}
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
                        value={targetDossier.startDate}
                        disabled={!editMode}
                        inputFormat={"DD/MM/YYYY"}
                        onChange={(newValue) => {
                          const newDate = new Date(newValue.$d);
                          setTargetDossier({ ...targetDossier, startDate: newDate })
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
                        value={targetDossier.endDate}
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
                      value={targetDossier.nbrPax}
                      disabled
                      style={{ "height": "55px" }}
                      id="nbrPax"
                      type="text"
                      onChange={(event) => { setTargetDossier({ ...targetDossier, nbrPax: event.target.value }) }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="" md="12">
                  <FormGroup>
                    <label>{t("Note")}</label>
                    <textarea
                      value={targetDossier.note}
                      disabled={!editMode}
                      style={{ "height": "80px", width: "100%", borderColor: "lightgray" }}
                      id="note"
                      type="text"
                      onChange={(event) => { setTargetDossier({ ...targetDossier, note: event.target.value }) }}
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
              {/* <Row>
                <Col md="12">
                  <HomeTable
                    circuitDates={{ start: targetDossier.startDate, end: targetDossier.endDate }}
                    setNewClient={setTargetDossier}
                    targetDossier={targetDossier}
                    selectedCircuit={targetDossier.circuit}
                    t={t}
                    hotels={hotels}
                    circuit={circuit}
                    setCircuit={setCircuit}
                    addNewHotel={(newHotel, cityId) => {
                      setNewHotelToDb([...newHotelToDb, { newHotel }])
                    }}
                  />
                </Col>
              </Row> */}
              <Row>
                <div className="update ml-auto mr-auto d-flex">
                  {
                    editMode === true ? (<>
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={async () => {
                          seteditMode(true);
                          const payload = await getOneDossier({ dossier_num: selectedDossier });
                        }}
                      >
                        {t("Edit")}
                      </Button>
                      <Button
                        className="btn-round"
                        color="danger"
                        onClick={() => {
                          seteditMode(false);
                        }}
                      >
                        {t("Cancel")}
                      </Button>
                    </>) : (
                      <>
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={async () => {
                            try {
                              // const hotels_dossier = [];
                              // circuit.forEach((item) => {
                              //   const hotels_dossier_item = hotels.filter((hotel) => hotel.cityName === item.city && hotel.hotelName === item.selectedHotel);
                              //   hotels_dossier.push({
                              //     dossier_num: targetDossier.folderNumber,
                              //     hotel_id: hotels_dossier_item[0].hotelId,
                              //     extra_nights: targetDossier.extraNights
                              //   })
                              // });

                              // seteditMode(false);
                              // await updateDossier({
                              //   dossier_num: selectedDossier,
                              //   ref_client: targetDossier.refClient,
                              //   name: targetDossier.fullName,
                              //   agency_id: targetDossier.agency,
                              //   circuit_id: targetDossier.circuit,
                              //   category: targetDossier.cat,
                              //   starts_at: targetDossier.startDate,
                              //   ends_at: targetDossier.endDate,
                              //   note: targetDossier.note,
                              //   hotels_dossier: hotels,
                              //   typeOfHb: targetDossier.typeOfHb,
                              // }).then((response) => {
                              //   // TODO: Add erro messgae later
                              //   if (!response?.success) return false;

                              //   // TODO: Add success messsage
                              // });
                            } catch (error) {
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
                            seteditMode(false)
                          }}
                        >
                          {t("Cancel")}
                        </Button>
                      </>
                    )
                  }

                </div>
              </Row>
            </Form> 
          </CardBody>
        </Card>
      </Modal>
    </div>
  )
}

export default DefaultModal;
