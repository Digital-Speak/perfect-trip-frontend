import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Table,
  Row,
  Col
} from "reactstrap";
import ReactHTMLTableToExcel from 'html-to-excel-react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import { getCities } from "../api/city";
import { getHotels } from "../api/hotel";
import { getDossier } from "../api/dossier";
import { useHistory } from 'react-router-dom';
import moment from "moment/moment";

function Hotels() {
  const { t } = useTranslation();
  const { push } = useHistory()
  const [dataSource, setDataSource] = useState({ keys: [], data: [] });
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  })

  const [cities, setCities] = useState({
    dataSource: [{
      id: -1,
      name: t("All")
    }],
    mapedData: [{
      label: t("All")
    }]
  })

  const [hotels, setHotels] = useState({
    dataSource: [{
      id: -1,
      city_id: -1,
      name: t("All")
    }],
    mapedData: [{
      label: t("All")
    }]
  })

  const [selectedCity, setSelectedCity] = useState({ id: -1, name: t("All") })
  const [selectedHotel, setSelectedHotel] = useState({ id: -1, city_id: -1, name: t("All") })

  const loadAppData = async () => {
    const payload_1 = await getCities();
    const payload_2 = await getHotels();

    if (!payload_1?.success || !payload_2?.success) return false;
    setCities({
      ...cities,
      dataSource: payload_1?.cities,
      mapedData: [...cities.mapedData, ...payload_1?.cities.map((item) => {
        return {
          label: item.name
        }
      })]
    })

    setHotels({
      ...hotels,
      dataSource: payload_2?.hotels,
      mapedData: [...hotels.mapedData, ...payload_2?.hotels.map((item) => { return { label: item.name } })]
    })
  }

  const loadDossierData = async (filters) => {
    const payload = await getDossier(filters);
    if (!payload?.success) return false;
    setDataSource({ data: payload?.dossiers })
  }

  useEffect(() => {
    loadAppData();
    loadDossierData(
      {
        starts_at: dates.start,
        ends_at: dates.end,
        city_id: selectedCity.id,
        hotel_id: selectedHotel.id,
      }
    );
  }, []);

  useEffect(() => {
    loadDossierData(
      {
        starts_at: dates.start,
        ends_at: dates.end,
        city_id: selectedCity.id,
        hotel_id: selectedHotel.id,
      }
    );
  }, [selectedCity.id, selectedHotel.id, dates.start, dates.end]);

  useEffect(() => {
    const newMappedData = [{ label: t("All") }, ...hotels?.dataSource
      .filter((item) => parseInt(item.city_id) === selectedCity.id)
      .map((item) => { return { label: item.name } })];

    setHotels({
      ...hotels,
      mapedData: newMappedData
    })
  }, [selectedCity.id]);

  return (
    <>
      <div className="content"
        style={{
          "width": "90%",
          "justifyContent": "center",
          "marginLeft": "auto",
          "marginRight": "auto"
        }}>
        <Row>
          <Col md="12">
            <Card>
              <div className="row px-5">
                <CardHeader>
                  <CardTitle tag="h5">{t("Filter-Folder")}</CardTitle>
                </CardHeader>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className={`download-table-xls-button btn btn-success ml-auto`}
                  table="table-to-xls"
                  filename={`List des dossier pour la ville:${selectedCity.name} et hotel: ${selectedHotel.name}`}
                  sheet="tablexls"
                  buttonText={<i className="fa fa-file-excel fa-3x"></i>}
                />
              </div>
              <CardBody >
                <Row>
                  <Col md="3"> <FormGroup>
                    <label>{t("City")}:</label>
                    <Autocomplete
                      disablePortal
                      id="cities"
                      sx={{ width: "auto" }}
                      defaultValue={t("All")}
                      options={cities.mapedData}
                      value={selectedCity.name}
                      renderInput={(params) => <TextField fullWidth {...params} label={t("Select")} />}
                      onInputChange={async (event, newInputValue) => {
                        if (newInputValue === t("All")) return setSelectedCity({ id: -1, name: t("All") });
                        const targetItem = cities.dataSource.filter((city) => city.name === newInputValue);
                        if (targetItem.length === 0) return false;
                        const { id, name } = targetItem[0];
                        setSelectedCity({ id, name });
                      }}
                    />
                  </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label>{t("Hotel")}:</label>
                      <Autocomplete
                        disablePortal
                        sx={{ width: "auto" }}
                        defaultValue={t("All")}
                        options={hotels.mapedData}
                        value={selectedHotel.name}
                        renderInput={(params) => <TextField fullWidth {...params} label={t("Select")} />}
                        onInputChange={async (event, newInputValue) => {
                          if (newInputValue === t("All")) return setSelectedHotel({ id: -1, name: t("All") });

                          const targetItem = hotels.dataSource.filter((hotel) => hotel.name === newInputValue);
                          if (targetItem.length === 0) return false;
                          const { id, name, city_id } = targetItem[0];
                          setSelectedHotel({ id, name, city_id });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3" xs="12">
                    <label>{t("From")}</label>
                    <FormGroup>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dates.start}
                          // maxDate={dates.end}
                          inputFormat={"DD/MM/YYYY"}
                          InputProps={{
                            disabled: true,
                          }}
                          onChange={(newValue) => {
                            const newDate = new Date(newValue.$d);
                            // if (moment(newDate).isSameOrBefore(moment(dates.start))) {
                            setDates({ ...dates, start: newDate });
                            // }
                          }}
                          renderInput={(params) =>
                            <TextField
                              disabled={true}
                              fullWidth {...params}
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }} />}
                        />
                      </LocalizationProvider>
                    </FormGroup>
                  </Col>
                  <Col md="3" xs="12">
                    <label>{t("To")}</label>
                    <FormGroup>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dates.end}
                          // minDate={dates.start}
                          InputProps={{
                            disabled: true,
                          }}
                          inputFormat={"DD/MM/YYYY"}
                          onChange={(newValue) => {
                            const newDate = new Date(newValue.$d);
                            // if (moment(newDate).isSameOrAfter(moment(dates.start))) {
                            setDates({ ...dates, end: newDate });
                            // }
                          }}
                          renderInput={(params) =>
                            <TextField
                              disabled={true}
                              fullWidth {...params}
                              onKeyDown={(e) => {
                                e.preventDefault();
                              }}
                            />}
                        />
                      </LocalizationProvider>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Table responsive striped>
                      <thead className="text-primary">
                        <tr>
                          <th style={{ textAlign: "center" }}>{t("From")}{"-"}{t("To")}</th>
                          {selectedCity.id === -1 && (<th style={{ textAlign: "center" }}>{t("City")}</th>)}
                          {selectedHotel.id === -1 && (<th style={{ textAlign: "center" }}>{t("Hotel")}</th>)}
                          <th style={{ textAlign: "center" }}>{t("Client-Ref")}</th>
                          <th style={{ textAlign: "center" }}>{t("FullName")}</th>
                          <th style={{ textAlign: "center" }}>{t("N° Pax")}</th>
                          <th style={{ textAlign: "center" }}>{t("Note")}</th>
                          <th style={{ textAlign: "center" }}>{t("Details")}</th>
                        </tr>
                      </thead>
                      <tbody style={{
                        "marginBottom": "100px"
                      }}>
                        {
                          dataSource.data.map((item) => (
                            <tr className="rowHoverMode">
                              <td style={{ justifyContent: "center", display: "flex", }}>
                                {new Date(item.startAt).toLocaleString('default', { month: 'long' }).substring(0, 3)}
                                -
                                {`${(new Date(item.startAt).getDate() < 10 ? "0" : "") + new Date(item.startAt).getDate()}`}
                                {"/"}
                                {new Date(item.endAt).toLocaleString('default', { month: 'long' }).substring(0, 3)}
                                -
                                {`${(new Date(item.endAt).getDate() < 10 ? "0" : "") + new Date(item.endAt).getDate()}`}
                              </td>
                              {selectedCity.id === -1 && (<td style={{ textAlign: "center" }}>{item.city}</td>)}
                              {selectedHotel.id === -1 && (<td style={{ textAlign: "center" }}>{item.hotel}</td>)}
                              < td style={{ textAlign: "center" }}>{item.clientRef}</td>
                              <td style={{ textAlign: "center" }}>{item.client}</td>
                              <td style={{ textAlign: "center" }}>
                                {item.nbrpaxforhbtype.map(({ typepax, nbr }, index) => nbr != 0 && (
                                  <span style={{ "fontSize": "12px", }}> {nbr}{typepax}</span>
                                ))}
                              </td>
                              <td style={{ textAlign: "center" }}>{item.note}</td>
                              <td style={{ textAlign: "center" }} onClick={() => {
                              }}><i className="fa fa-envelope cellHoverMode"
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  sessionStorage.setItem("TargetFolder", item?.clientRef);
                                  push("/admin/details")
                                }}
                                /></td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <table
          className='d-none'
          id="table-to-xls"
          style={{
            "border": "1px solid black"
          }}>
          <thead className="text-primary">
            <tr></tr>
            <tr></tr>
            <tr>
              <th style={{ border: "none" }}></th>
              <td
                colSpan={5}
                style={{
                  color: "red",
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                  border: 0
                }}>
                {t("Hotels")}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr style={{ border: "0.5px solid black", fontSize: "15px" }}>
              <th style={{ border: "none" }}></th>
              {(
                <td style={{ border: "none", textAlign: "center" }} colSpan={2}>
                  {t("From")}:
                  <span style={{ fontWeight: "bold" }} >{t(` ${moment(new Date(dates.start)).format("DD/MM/YYYY")}`)}</span>
                </td>
              )}
              {(
                <td style={{ border: "none", textAlign: "center" }} colSpan={2}>
                  {t("To")}:
                  <span style={{ fontWeight: "bold" }} >{t(` ${moment(new Date(dates.end)).format("DD/MM/YYYY")}`)}</span>
                </td>
              )}
            </tr>
            <tr></tr>
            <tr>
              <td>
                {(<th style={{ textAlign: "center" }} colSpan={2}>{t("City")}</th>)}
                {(<th style={{ textAlign: "center" }} colSpan={2}>{t("Hotel")}</th>)}
              </td>
            </tr>
            <tr>
              <td>
                {(<td style={{ textAlign: "center" }} colSpan={2}>{t(`${selectedCity.name}`)}
                </td>)}
                {(<td style={{ textAlign: "center" }} colSpan={2}>{t(`${selectedHotel.name}`)}
                </td>)}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr style={{
              backgroundColor: "lightgray"
            }}>
              <th style={{ border: "none", backgroundColor: "white" }}></th>
              <th style={{ textAlign: "center" }}>{t("From")}{"-"}{t("To")}</th>
              {selectedCity.id === -1 && (<th style={{ textAlign: "center" }}>{t("City")}</th>)}
              {selectedHotel.id === -1 && (<th style={{ textAlign: "center" }}>{t("Hotel")}</th>)}
              <th style={{ textAlign: "center" }} colSpan={2}>{t("Client-Ref")}</th>
              <th style={{ textAlign: "center" }} colSpan={2}>{t("FullName")}</th>
              <th style={{ textAlign: "center" }} colSpan={3}>{t("N° Pax")}</th>
              <th style={{ textAlign: "center" }} colSpan={3}>{t("Note")}</th>
            </tr>
          </thead>
          <tbody style={{
            marginBottom: "100px"
          }}>
            {
              dataSource.data.map((item) => (
                <tr>
                  <th style={{ border: "none" }}></th>
                  <td style={{ justifyContent: "center", display: "flex", }}>
                    {new Date(item.startAt).toLocaleString('default', { month: 'long' }).substring(0, 3)}
                    -
                    {`${(new Date(item.startAt).getDate() < 10 ? "0" : "") + new Date(item.startAt).getDate()}`}
                    {"/"}
                    {new Date(item.endAt).toLocaleString('default', { month: 'long' }).substring(0, 3)}
                    -
                    {`${(new Date(item.endAt).getDate() < 10 ? "0" : "") + new Date(item.endAt).getDate()}`}
                  </td>
                  {selectedCity.id === -1 && (<td style={{ textAlign: "center" }}>{item.city}</td>)}
                  {selectedHotel.id === -1 && (<td style={{ textAlign: "center" }}>{item.hotel}</td>)}
                  <td style={{ textAlign: "center" }} colSpan={2}>{item.clientRef}</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>{item.client}</td>
                  <td style={{ textAlign: "center" }} colSpan={3}>
                    {item.nbrpaxforhbtype.map(({ typepax, nbr }) =>
                      parseInt(nbr) !== 0 && (
                        <span style={{ "fontSize": "12px", }}> {nbr}{typepax}</span>
                      ))}
                  </td>
                  <td style={{ textAlign: "center" }} colSpan={3}>{item.note}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Hotels;
