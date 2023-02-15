import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { getCircuit, postData } from "../../api/dashboard";
import { getAgencies } from "../../api/agency";
import { updateFolder, getOneDossier, removeDossier } from "../../api/dossier";
import { getCities } from "api/city";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { message } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';
import cats from "../../assets/data/cats.json";
import ReactHTMLTableToExcel from 'html-to-excel-react';
import PaxNumber from "../../components/Tables/Pax-Number";
import moment from "moment/moment";
import SelectedCircuitEdit from "../../components/Tables/SelectedCircuitEdit";
import TextField from '@mui/material/TextField';
import '../../assets/css/views/folderDetails.css';

export default function Edit() {
  const { t } = useTranslation();
  const [circuitsServerData, setCircuitsServerData] = useState([]);
  const [agencesServerData, setAgencesServerData] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [agences, setAgencies] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [circuit, setCircuit] = useState([]);
  const [circuitDetails, setCircuitDetails] = useState([]);
  const [newHotelToDb, setNewHotelToDb] = useState([]);
  const [typeOfHb, setTypeOfHb] = useState([
    {
      label: "DBL",
      plus: 2,
      dispaly: 0,
      nbr: 0,
    }, {
      label: "TWIN",
      plus: 2,
      dispaly: 0,
      nbr: 0,
    }, {
      label: "TRPL",
      dispaly: 0,
      plus: 3,
      nbr: 0,
    }, {
      label: "SGL",
      plus: 1,
      dispaly: 0,
      nbr: 0,
    }]);
  const [isInEditeMode, setEditeMode] = useState(false)
  const [flights, setFlights] = useState({
    from_to_start: null,
    city_id_start: null,
    from_start: null,
    to_start: null,
    flight_start: null,
    flight_time_start: new Date(),
    from_to_end: null,
    city_id_end: 0,
    from_end: null,
    to_end: null,
    flight_end: null,
    flight_time_end: new Date(),
    flight_date_start: null,
    flight_date_end: null,
  });

  const [targetFolder, setTargetFolder] = useState({
    folderNumber: null,
    refClient: null,
    newClientRef: null,
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
    startDate: new Date(),
    endDate: new Date(),
    extraNights: 0,
    deleted: false
  });
  const [messageApi, contextHolder] = message.useMessage();

  const loadData = async () => {
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

  const nombreHAB = () => {
    let text = "";
    typeOfHb?.forEach((hab, index) => {
      if (hab?.dispaly !== 0) {
        text === "" ?
          text = text + hab?.label + ' x' + hab?.dispaly + "   " :
          text = text + '  &  ' + hab?.label + ' x' + hab?.dispaly;
      }
    })
    return text;
  }

  const clearInputs = async () => {
    setTargetFolder({
      dossierNum: "",
      newClientRef: "",
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
      nbrPax: "",
      startDate: new Date(),
      endDate: new Date(),
      extraNights: "",
      typeOfHb: [],
      note: "",
      deleted: false
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

  const getTargetDossier = async (value) => {
    setTargetFolder({ ...targetFolder, refClient: value });
    const payload = await getOneDossier({
      ref_client: value
    });
    if (payload?.success) {
      if (payload?.data.length !== 0) {
        const nbrType = [];
        if (payload?.nbrpaxforhbtype?.length != 0) {
          payload?.nbrpaxforhbtype.forEach((item) => {
            let plus = 0;
            if (item?.typepax === "DBL") plus = 2;
            if (item?.typepax === "TWIN") plus = 2;
            if (item?.typepax === "TRPL") plus = 3;
            if (item?.typepax === "SGL") plus = 1;
            nbrType.push({
              label: item.typepax,
              plus: plus,
              dispaly: parseInt(item.nbr) / parseInt(plus),
              nbr: parseInt(item.nbr),
            })
          })

          setTypeOfHb(nbrType);
          let totalNbrPax = 0;
          nbrType.forEach((item) => totalNbrPax = totalNbrPax + item.nbr);
        }

        setCircuitDetails(payload?.circuits?.sort((a, b) => new Date(a.start_date) - new Date(b.start_date)));
        console.log(targetFolder);
        setTargetFolder({
          ...targetFolder,
          refClient: value,
          fullName: payload?.data[0]?.client_name,
          newClientRef: payload?.data[0]?.client_ref,
          folderNumber: payload?.data[0]?.dossierNum,
          agency: {
            name: payload?.data[0]?.agency,
            id: payload?.data[0]?.agency_id
          },
          circuit: {
            name: payload?.data[0]?.circuit,
            id: payload?.data[0]?.circuit_id
          },
          cat: {
            name: payload?.data[0]?.category,
            id: payload?.data[0]?.category
          },
          nbrPax: 0,
          startDate: payload?.data[0]?.startAt,
          endDate: payload?.data[0]?.endAt,
          extraNights: 0,
          note: payload?.data[0]?.note,
          deleted: payload?.data[0]?.deleted,
          typeOfHb: payload?.nbrpaxforhbtype?.length != 0 ? nbrType : typeOfHb
        });

        setFlights({
          from_to_start: payload?.data[0]?.from_to_start,
          city_id_start: payload?.data[0]?.city_id_start,
          from_start: payload?.data[0]?.from_start,
          to_start: payload?.data[0]?.to_start,
          flight_start: payload?.data[0]?.flight_start,
          flight_time_start: payload?.data[0]?.flight_time_start,
          from_to_end: payload?.data[0]?.from_to_end,
          city_id_end: payload?.data[0]?.city_id_end,
          from_end: payload?.data[0]?.from_end,
          to_end: payload?.data[0]?.to_end,
          flight_end: payload?.data[0]?.flight_end,
          flight_time_end: payload?.data[0]?.flight_time_end,
          flight_date_start: payload?.data[0]?.flight_date_start,
          flight_date_end: payload?.data[0]?.flight_date_end,
        })
      } else {
        clearInputs();
      }
    } else {
      clearInputs();
    }
  }

  useEffect(() => {
    if (circuit.length === 0) loadData();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("TargetFolder") != "null") {
      const targetRef = sessionStorage.getItem("TargetFolder");
      setTargetFolder({ ...targetFolder, refClient: targetRef })
      sessionStorage.setItem("TargetFolder", "null");
      getTargetDossier(targetRef);
    }
  }, [sessionStorage.getItem("TargetFolder")])

  useEffect(() => {
    if (targetFolder?.circuit !== "" && targetFolder?.cat !== "") {
      fetchHotels(targetFolder?.circuit?.id, targetFolder?.cat?.name);
    }
  }, [targetFolder?.circuit, targetFolder?.cat]);

  useEffect(() => {
    let totalNbrPax = 0;
    typeOfHb.forEach((item) => totalNbrPax = totalNbrPax + item.nbr);
    setTargetFolder({ ...targetFolder, nbrPax: totalNbrPax, typeOfHb: typeOfHb })
  }, [typeOfHb]);

  return (
    <>
      {contextHolder}
      <div className={`content`} style={{ "width": "90%", "justifyContent": "center", "marginLeft": "auto", "marginRight": "auto" }}>
        <Row>
          <Col>
            <Card className={`card-user`} style={{
              border: targetFolder.deleted == true ? "red solid 2px" : "lightgray solid 0.2px"
            }}>
              <div className="row px-5">
                <CardHeader>
                  <CardTitle tag="h5">{t("Search For A Folder")}</CardTitle>
                </CardHeader>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className={`download-table-xls-button btn btn-success ml-auto ${targetFolder.deleted == true && 'btn-danger'}`}
                  table="table-to-xls"
                  filename={`dossier-number-${targetFolder?.folderNumber}`}
                  sheet="tablexls"
                  buttonText={<i className="fa fa-file-excel fa-3x"></i>}
                />
              </div>
              <CardBody >
                <Form className={`${targetFolder.deleted == true && 'deletedDossier'}`}>
                  <Row>
                    <Col className="" md="2">
                      <FormGroup>
                        <label>{t("Folder-Number")}</label>
                        <Input
                          disabled
                          value={targetFolder?.folderNumber}
                          style={{ "height": "55px" }}
                          id="firstname"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="5">
                      <FormGroup>
                        <label>{t("Client-Ref")}: <span style={{
                          fontWeight: "bolder",
                          fontSize: "15px",
                          fontStyle: "italic"
                        }}>{targetFolder.newClientRef}</span></label>
                        <Input
                          value={targetFolder?.refClient}
                          id="refClient"
                          style={{ "height": "55px" }}
                          type="text"
                          onChange={async (event) => {
                            if (event.target.value === "") {
                              clearInputs();
                            } else {
                              await getTargetDossier(event.target.value);
                            }
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="5">
                      <FormGroup>
                        <label>{t("Agency")}</label>
                        <Autocomplete
                          disablePortal
                          disabled={!isInEditeMode}
                          options={agences}
                          sx={{ width: "auto" }}
                          value={targetFolder?.agency?.name}
                          clearOnEscape
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            const agencyId = agencesServerData.filter((item) => item.name === newInputValue);
                            if (agencyId.length !== 0)
                              setTargetFolder({ ...targetFolder, agency: { name: newInputValue, id: agencyId[0].id } })

                          }}
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
                          disabled={!isInEditeMode}
                          id="circuit"
                          options={circuits}
                          sx={{ width: "auto" }}
                          value={targetFolder?.circuit?.name}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={async (event, newInputValue) => {
                            const circuitId = circuitsServerData.filter((item) => item.name === newInputValue);
                            if (circuitId.length !== 0)
                              setTargetFolder({ ...targetFolder, circuit: { name: newInputValue, id: circuitId[0].id } });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Cat")}</label>
                        <Autocomplete
                          disablePortal
                          disabled={!isInEditeMode}
                          id="cat"
                          options={cats}
                          sx={{ width: "auto" }}
                          value={targetFolder?.cat?.name}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setTargetFolder({
                              ...targetFolder,
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
                          disabled={!isInEditeMode}
                          value={targetFolder?.fullName}
                          style={{ "height": "55px" }}
                          id="fullName"
                          type="text"
                          onChange={(event) => {
                            setTargetFolder({ ...targetFolder, fullName: event.target.value })
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
                            value={targetFolder?.startDate}
                            disabled={!isInEditeMode}
                            inputFormat={"DD/MM/YYYY"}
                            onChange={(newValue) => {
                              if (targetFolder?.startDate !== null) {
                                const newDate = new Date(newValue.$d);
                                setFlights({
                                  ...flights,
                                  flight_date_start: newDate
                                })
                                setTargetFolder({ ...targetFolder, startDate: newDate })
                              }
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
                            value={targetFolder?.endDate}
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
                          value={targetFolder?.nbrPax}
                          disabled
                          style={{ "height": "55px" }}
                          id="nbrPax"
                          type="text"
                          onChange={(event) => { setTargetFolder({ ...targetFolder, nbrPax: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="12">
                      <FormGroup>
                        <label>{t("Note")}</label>
                        <textarea
                          value={targetFolder?.note}
                          disabled={!isInEditeMode}
                          style={{ "height": "80px", width: "100%", borderColor: "lightgray" }}
                          id="note"
                          type="text"
                          onChange={(event) => { setTargetFolder({ ...targetFolder, note: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="12">
                      <FormGroup>
                        <label>{t("Type-HB")}</label>
                        <PaxNumber disabled={!isInEditeMode}
                          data={typeOfHb}
                          cb={(data) => {
                            setTypeOfHb(data);
                          }} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <SelectedCircuitEdit
                        disabled={!isInEditeMode}
                        circuitDates={{ start: targetFolder?.startDate, end: targetFolder?.endDate }}
                        setNewClient={setTargetFolder}
                        newClient={targetFolder}
                        selectedCircuit={targetFolder?.circuit}
                        t={t}
                        className={`${targetFolder.deleted == true && 'deletedDossier'}`}
                        cities={cities}
                        flights={flights}
                        setFlights={setFlights}
                        hotels={hotels}
                        circuit={circuit}
                        setCircuit={setCircuit}
                        isDetails={true}
                        circuitDetails={circuitDetails}
                        addNewHotel={(newHotel, cityId) => {
                          setNewHotelToDb([...newHotelToDb, { newHotel }])
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {isInEditeMode === true ? (
                      <div className="update ml-auto mr-auto d-flex">
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={async () => {
                            try {
                              if (
                                targetFolder?.folderNumber === "ERROR" ||
                                targetFolder?.refClient === null ||
                                targetFolder?.fullName === null ||
                                targetFolder?.cat?.id === null ||
                                targetFolder?.circuit?.id === null ||
                                targetFolder?.startDate === null ||
                                targetFolder?.endDate === null ||
                                targetFolder?.typeOfHb === null ||
                                targetFolder?.agency?.id === null ||
                                targetFolder?.nbrPax === null
                              ) {
                                return messageApi.open({
                                  type: 'error',
                                  content: t("Please fill all the inputs"),
                                });
                              }

                              const payload = await updateFolder({
                                dossier_num: targetFolder.folderNumber,
                                ref_client: targetFolder.refClient,
                                new_ref_client: targetFolder.newClientRef,
                                name: targetFolder.fullName,
                                category: targetFolder.cat.id,
                                starts_at: targetFolder.startDate,
                                ends_at: targetFolder.endDate,
                                agency_id: targetFolder.agency.id,
                                circuit_id: targetFolder.circuit.id,
                                hotels_dossier: [],
                                typeOfHb: targetFolder.typeOfHb,
                                nbrPax: targetFolder?.nbrPax,
                                note: targetFolder.note,
                                ...flights
                              });
                              if (payload?.success) {
                                messageApi.open({
                                  type: 'success',
                                  content: t("Folder has been edited successfully"),
                                });
                                getTargetDossier(targetFolder.refClient);
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
                            setEditeMode(false)
                          }}
                        >
                          {t("Cancel")}
                        </Button>
                      </div>
                    ) :
                      !targetFolder.deleted ? (
                        <div className="update ml-auto mr-auto d-flex">
                          <Button
                            className="btn-round"
                            disabled={targetFolder.folderNumber === null}
                            color="primary"
                            onClick={() => {
                              if (targetFolder.folderNumber !== null) {
                                setEditeMode(true)
                              } else {
                                message.warning("There is no selected Folder")
                              }
                            }}
                          >
                            {t("Edite")}
                          </Button>
                          <Button
                            className="btn-round"
                            color="danger"
                            disabled={targetFolder.folderNumber === null}
                            onClick={async () => {
                              // eslint-disable-next-line no-restricted-globals
                              if (confirm(t("Do you want to remove this Folder")) === true) {
                                await removeDossier({ dossier_num: targetFolder.folderNumber, state: true });
                                await getTargetDossier(targetFolder.folderNumber);
                              }
                            }}
                          >
                            {t("Remove")}
                          </Button>
                        </div>
                      ) : (
                        <div className="update ml-auto mr-auto d-flex">
                          <Button
                            className="btn-round"
                            color="success"
                            disabled={targetFolder.folderNumber === null}
                            onClick={async () => {
                              // eslint-disable-next-line no-restricted-globals
                              if (confirm(t("Do you want to recover this Folder")) === true) {
                                await removeDossier({ dossier_num: targetFolder.folderNumber, state: false })
                                await getTargetDossier(targetFolder.folderNumber);
                              }
                            }}
                          >
                            {t("Recover")}
                          </Button>
                        </div>
                      )}
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <table className="d-none" id="table-to-xls">
          <tr></tr>
          <tr></tr>
          <tr><th></th><th style={{ width: "150px", height: "50px" }}>logo</th></tr>
          <tr></tr>
          <tr><th></th><th style={{ width: "150px" }}></th><th style={{ width: "150px" }}></th><th colSpan={3} style={{ width: "250px", height: "50px" }}>CONFIRMATION DE RESERVATION</th></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>

          <tr ><th></th><th style={styles.td} >Agence</th><th style={styles.td} >pour</th><th style={styles.td} >date</th></tr>
          <tr ><th></th><td style={styles.td} >{targetFolder?.agency?.name}</td><td style={styles.td} >toAskfor</td><td style={styles.td} >{moment(new Date(Date.now()).toLocaleDateString()).format('DD/MM/YYYY')}</td></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>

          <tr><th></th><th style={styles.td} colSpan={3} >NOMBRE</th><th style={styles.td} >HAB</th><th style={styles.td} >PAX</th><th style={styles.td} colSpan={2} >TOUR</th><th style={styles.td} colSpan={2} >DATE</th></tr>
          <tr><th></th><td style={styles.td} colSpan={3} >
            {nombreHAB()}
          </td>
            <td style={styles.td} >
              {
                parseInt(typeOfHb[0]?.dispaly) + parseInt(typeOfHb[1]?.dispaly) + parseInt(typeOfHb[2]?.dispaly) + parseInt(typeOfHb[3]?.dispaly) + ' habitation'
              }
            </td>
            <td style={styles.td} >{targetFolder?.nbrPax?.toString()}</td><td style={styles.td} colSpan={2} >{targetFolder?.circuit?.name}</td><td style={styles.td} colSpan={2} >{moment((targetFolder?.startDate)?.toString()).format('DD/MM/YYYY')}</td></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>

          <tr><th></th><th style={styles.td} >HOTELS</th></tr>
          <tr><th></th><th style={styles.td} colSpan={2} >VILLE</th><th style={styles.td} colSpan={2} >HOTEL</th><th style={styles.td} colSpan={2} >DU</th><th style={styles.td} colSpan={2} >AU</th><th style={styles.td} >REGIME</th><th style={styles.td} colSpan={4} >NOTE</th></tr>
          {
            circuit?.map((data) => (
              <tr><th></th><td style={styles.td} colSpan={2} >{data?.city}</td><td style={styles.td} colSpan={2} >{data?.selectedHotel}</td><td style={styles.td} colSpan={2} >{data?.from}</td><td style={styles.td} colSpan={2} >{data?.to}</td><td style={styles.td} >{data?.regimgeData}</td><td style={styles.td} colSpan={4} >{targetFolder?.note}</td></tr>
            ))
          }
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>

          <tr><th></th><th style={styles.td} >DE/A</th><th style={styles.td} >DATE</th><th style={styles.td} >VILLE</th><th style={styles.td} colSpan={2}>DE</th><th style={styles.td} colSpan={2} >A</th><th style={styles.td} colSpan={2} >VOLS</th><th style={styles.td} colSpan={2} >HEURS</th></tr>
          <tr><th></th>
            <td style={styles.td} >{flights?.from_to_start}</td>
            <td style={styles.td} >{moment(flights?.flight_date_start?.toString()).format('DD/MM/YYYY')}</td>
            {flights && cities?.map((city) => (
              city?.id == flights?.city_id_start &&
              <td style={styles.td} >
                {city?.name}
              </td>
            ))
            }
            <td style={styles.td} colSpan={2} >{flights?.from_start?.toString()}</td>
            <td style={styles.td} colSpan={2} >{flights?.to_start?.toString()}</td>
            <td style={styles.td} colSpan={2} >{flights?.flight_start}</td>
            <td style={styles.td} colSpan={2} >{flights?.flight_time_start?.toString()}</td>
          </tr>
          <tr>
            <th></th><td style={styles.td} >{flights?.from_to_end?.toString()}</td><td style={styles.td} >{moment(flights?.flight_date_end?.toString()).format('DD/MM/YYYY')}</td>
            {flights && cities?.map((city) => (
              city?.id == flights?.city_id_end &&
              <td style={styles.td} >
                {city?.name}
              </td>
            ))
            }
            <td style={styles.td} colSpan={2} >{flights?.from_end?.toString()}</td>
            <td style={styles.td} colSpan={2} >{flights?.to_end}</td>
            <td style={styles.td} colSpan={2} >{flights?.flight_end}</td>
            <td style={styles.td} colSpan={2} >{flights?.flight_time_end?.toString()}</td>
          </tr>

        </table>
      </div>
    </>
  );
}
const styles = {
  td: {
    border: 1,
    borderColor: "black",
    borderStyle: "solid",
    height: '40px',
  }
}
