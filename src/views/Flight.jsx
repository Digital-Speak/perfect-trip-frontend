import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, FormGroup } from "reactstrap";
import _ from "lodash";
import { useTranslation } from 'react-i18next';
import { getListFlights } from "api/flight";
import { TextField } from "@mui/material";
import { getCities } from "api/city";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactHTMLTableToExcel from 'html-to-excel-react';

const moment = require("moment");

export default function Flight() {
  const { t } = useTranslation();
  const { push } = useHistory()
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [cities, setCities] = useState([])
  const [filterState, setFilterState] = useState({
    type: 3,
    cityId: -1,
    from: moment(new Date()),
    to: moment(new Date()).add(1, "days")
  });

  const loadData = async () => {
    const payload = await getListFlights();
    const _cities = await getCities();
    setCities(_cities?.cities);
    setList(payload?.flights);
    setFilterState({
      ...filterState,
      from: moment(),
      to: moment(new Date()).add(1, "days")
    })
    await filter();
  }

  const filter = () => {
    const filtered = [];
    list?.sort((a, b) => new Date(a?.flight_date_start) - new Date(b?.flight_date_start) || new Date(a?.flight_date_end) - new Date(b?.flight_date_end)).forEach((flight, index) => {
      if (parseInt(filterState.type) === 1) {
        const start_date = flight.flight_date_start;
        if (moment(start_date).isSameOrAfter(filterState.from, "day") && moment(start_date).isSameOrBefore(filterState.to, "day")) {

          if (parseInt(filterState.cityId) !== -1) {
            if (parseInt(flight.city_id_start) === parseInt(filterState.cityId)) {
              filtered.push(flight);
            }
          } else if (parseInt(filterState.cityId) === -1) {
            filtered.push(flight);
          }
        }
      } else if (parseInt(filterState.type) === 2) {
        const end_date = flight.flight_date_end;
        if (moment(end_date).isSameOrAfter(filterState.from, "day") && moment(end_date).isSameOrBefore(filterState.to, "day")) {
          if (parseInt(filterState.cityId) !== -1) {
            if (parseInt(flight.city_id_end) === parseInt(filterState.cityId)) {
              filtered.push(flight);
            }
          } else if (parseInt(filterState.cityId) === -1) {
            filtered.push(flight);
          }
        }
      } else if (parseInt(filterState.type) === 3) {
        const end_date = flight.flight_date_end;
        const start_date = flight.flight_date_start;

        if (moment(end_date).isSameOrAfter(filterState.from, "day") && moment(end_date).isSameOrBefore(filterState.to, "day") && moment(start_date).isSameOrAfter(filterState.from, "day") && moment(start_date).isSameOrBefore(filterState.to, "day")) {
          if (parseInt(filterState.cityId) !== -1) {
            if (
              parseInt(flight.city_id_end) === parseInt(filterState.cityId)
              ||
              parseInt(flight.city_id_start) === parseInt(filterState.cityId)) {
              filtered.push(flight);
            }
          } else if (parseInt(filterState.cityId) === -1) {
            filtered.push(flight);
          }
        }
      }

      if (parseInt(index) === parseInt(list.length) - 1) {
        setFilteredList([...filtered]);
      }
    });
  }

  const formatDate = (unformatted) => {
    const date = new Date(unformatted);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
  }

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    filter()
  }, [filterState])


  const getDetails = (item) => (
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
  )
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
              <CardHeader>
                <div className="row px-5">
                  <CardHeader>
                    <CardTitle tag="h5">{t("Filter-flights")}</CardTitle>
                  </CardHeader>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success ml-auto"
                    table="table-to-xls"
                    filename={`Vols_${new Date().getTime()}`}
                    sheet="tablexls"
                    buttonText={<i className="fa fa-file-excel fa-3x"></i>}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <FormGroup>
                        <label>{t("Type")}</label>
                        <select
                          className="form-control"
                          style={{ height: "55px" }}
                          value={filterState?.type}
                          onChange={(event) => {
                            setFilterState({
                              ...filterState,
                              type: event.target.value
                            })
                          }}>
                          <option value={3}>{"Tout"}</option>
                          <option value={1}>{"APT / HOTEL"}</option>
                          <option value={2}>{"HOTEL / APT"}</option>
                        </select>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <FormGroup>
                        <label>{t("City")}</label>
                        <select
                          className="form-control"
                          style={{ height: "55px" }}
                          onChange={(event) => {
                            setFilterState({
                              ...filterState,
                              cityId: event.target.value
                            })
                          }} name="" id="">
                          <option value={-1}>{t("All")}</option>
                          {cities.length !== 0 && cities?.map((city) =>
                          (
                            <option value={city?.id}>{city?.name}</option>
                          ))
                          }
                        </select>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col md="3" xs="12">
                    <label>{t("From")}</label>
                    <FormGroup>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          value={filterState?.from}
                          // maxDate={filterState.to}
                          InputProps={{
                            disabled: true,
                          }}
                          inputFormat={"DD/MM/YYYY"}
                          onChange={(newValue) => {
                            const newDate = new Date(newValue.$d);
                            setFilterState({
                              ...filterState,
                              from: newDate
                            })
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
                  <Col md="3" xs="12">
                    <label>{t("To")}</label>
                    <FormGroup>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={filterState?.to}
                          // minDate={filterState.from}
                          inputFormat={"DD/MM/YYYY"}
                          InputProps={{
                            disabled: true,
                          }}
                          onChange={(newValue) => {
                            const newDate = new Date(newValue.$d);
                            setFilterState({
                              ...filterState,
                              to: formatDate(newDate)
                            })
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
                    <Table responsive striped >
                      <thead className="text-primary">
                        <tr>
                          {filterState.type == 3 && <th style={{ textAlign: "center" }}>{t("Type")}</th>}
                          <th style={{ textAlign: "center" }}>{t("Date")}</th>
                          <th style={{ textAlign: "center" }}>{t("City")}</th>
                          <th style={{ textAlign: "center" }}>{t("From")}</th>
                          <th style={{ textAlign: "center" }}>{t("To")}</th>
                          <th style={{ textAlign: "center" }}>{t("Client-Name")}</th>
                          <th style={{ textAlign: "center" }}>{t("Nbr Pax")}</th>
                          <th style={{ textAlign: "center" }}>{t("Flight")}</th>
                          <th style={{ textAlign: "center" }}>{t("Time")}</th>
                          <th style={{ textAlign: "center" }}>{t("Details")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredList && filteredList?.length !== 0 && filteredList?.map((item, index) => (
                          <>
                            {filterState.type == 1 ?
                              (<tr className="rowHoverMode">
                                <td style={{ textAlign: "center" }}>{moment(item?.flight_date_start).format("DD/MM/YYYY")}</td>
                                <td style={{ textAlign: "center" }}>{item?.cityName1}</td>
                                <td style={{ textAlign: "center" }}>{item?.from_start}</td>
                                <td style={{ textAlign: "center" }}>{item?.to_start}</td>
                                <td style={{ textAlign: "center" }}>{item?.client_name}</td>
                                <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                                <td style={{ textAlign: "center" }}>{item?.flight_start}</td>
                                <td style={{ textAlign: "center" }}>{item?.flight_time_start}</td>
                                {getDetails(item)}
                              </tr>)
                              : filterState.type == 2 ?
                                (
                                  <tr className="rowHoverMode">
                                    <td style={{ textAlign: "center" }}>{moment(item?.flight_date_end).format("DD/MM/YYYY")}</td>
                                    <td style={{ textAlign: "center" }}>{item?.cityName2}</td>
                                    <td style={{ textAlign: "center" }}>{item?.from_end}</td>
                                    <td style={{ textAlign: "center" }}>{item?.to_end}</td>
                                    <td style={{ textAlign: "center" }}>{item?.client_name}</td>
                                    <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                                    <td style={{ textAlign: "center" }}>{item?.flight_end}</td>
                                    <td style={{ textAlign: "center" }}>{item?.flight_time_end}</td>
                                    {getDetails(item)}
                                  </tr>
                                ) : (
                                  <>
                                    <tr className="rowHoverMode">
                                      <td style={{ textAlign: "center" }}>{item?.from_to_start}</td>
                                      <td style={{ textAlign: "center" }}>{moment(item?.flight_date_start).format("DD/MM/YYYY")}</td>
                                      <td style={{ textAlign: "center" }}>{item?.cityName1}</td>
                                      <td style={{ textAlign: "center" }}>{item?.from_start}</td>
                                      <td style={{ textAlign: "center" }}>{item?.to_start}</td>
                                      <td style={{ textAlign: "center" }}>{item?.client_name}</td>
                                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                                      <td style={{ textAlign: "center" }}>{item?.flight_start}</td>
                                      <td style={{ textAlign: "center" }}>{item?.flight_time_start}</td>
                                      {getDetails(item)}
                                    </tr>
                                    <tr className="rowHoverMode">
                                      <td style={{ textAlign: "center" }}>{item?.from_to_end}</td>
                                      <td style={{ textAlign: "center" }}>{moment(item?.flight_date_end).format("DD/MM/YYYY")}</td>
                                      <td style={{ textAlign: "center" }}>{item?.cityName2}</td>
                                      <td style={{ textAlign: "center" }}>{item?.from_end}</td>
                                      <td style={{ textAlign: "center" }}>{item?.to_end}</td>
                                      <td style={{ textAlign: "center" }}>{item?.client_name}</td>
                                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                                      <td style={{ textAlign: "center" }}>{item?.flight_end}</td>
                                      <td style={{ textAlign: "center" }}>{item?.flight_time_end}</td>
                                      {getDetails(item)}
                                    </tr>
                                  </>
                                )
                            }
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <table
        className='d-none'
        id="table-to-xls"
        style={{
          "border": "1px solid black",
          fontSize: "14px"
        }}>
        <thead className="text-primary">
          <tr></tr>
          <tr></tr>
          <tr>
            <th style={{ border: "none" }}></th>
            <td style={{ textAlign: "center", border: "none" }} colSpan={2}>Filtre les vols par date:</td>
          </tr>
          <tr style={{ border: "0.5px solid black", fontSize: "15px" }}>
            <th style={{ border: "none" }}></th>
            {(
              <td style={{ border: "none", textAlign: "center" }} colSpan={2}>
                {t("From")}:
                <span style={{ fontWeight: "bold" }} >{t(` ${moment(new Date(filterState.from)).format("DD/MM/YYYY")}`)}</span>
              </td>
            )}
            {(
              <td style={{ border: "none", textAlign: "center" }} colSpan={2}>
                {t("To")}:
                <span style={{ fontWeight: "bold" }} >{t(` ${moment(new Date(filterState.to)).format("DD/MM/YYYY")}`)}</span>
              </td>
            )}
          </tr>
          <tr></tr>
          <tr style={{
            backgroundColor: "lightgray"
          }}>
            <th style={{ border: "none", backgroundColor: "white" }}></th>
            <th style={{ textAlign: "center" }} colSpan={1}>{t("Type")}</th>
            <th style={{ textAlign: "center" }} colSpan={1}>{t("Date")}</th>
            <th style={{ textAlign: "center" }} colSpan={2}>{t("City")}</th>
            <th style={{ textAlign: "center" }} colSpan={2}>{t("From")}</th>
            <th style={{ textAlign: "center" }} colSpan={2}>{t("To")}</th>
            <th style={{ textAlign: "center" }} colSpan={2}>{t("Client-Name")}</th>
            <th style={{ textAlign: "center" }} colSpan={2}>{t("Nbr Pax")}</th>
            <th style={{ textAlign: "center" }} colSpan={1}>{t("Flight")}</th>
            <th style={{ textAlign: "center" }} colSpan={1}>{t("Time")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredList && filteredList?.length !== 0 && filteredList?.map((item, index) => (
            <>
              {parseInt(filterState.type) === 1 ?
                (<tr>
                  <th style={{ border: "none" }}></th>
                  <td style={{ textAlign: "center" }} colSpan={1}>APT / HOTEL</td>
                  <td style={{ textAlign: "center" }} colSpan={1}>{moment(item?.flight_date_start).format("DD/MM/YYYY")}</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>{item?.cityName1}</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>{item?.from_start}</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>{item?.to_start}</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>{item?.client_name}</td>
                  <td style={{ textAlign: "center" }} colSpan={2}>{item?.client_name}</td>
                  <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                  <td style={{ textAlign: "center" }} colSpan={1}>{item?.flight_time_start}</td>
                </tr>)
                : parseInt(filterState.type) === 2 ?
                  (
                    <tr>
                      <th style={{ border: "none" }}></th>
                      <td style={{ textAlign: "center" }} colSpan={1}>HOTEL / APT</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{moment(item?.flight_date_end).format("DD/MM/YYYY")}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.cityName2}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.from_end}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.to_end}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.client_name}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.flight_end}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.flight_time_end}</td>
                    </tr>
                  ) :
                  (<>
                    <tr>
                      <th style={{ border: "none" }}></th>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.from_to_end}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{moment(item?.flight_date_end).format("DD/MM/YYYY")}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.cityName2}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.from_end}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.to_end}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.client_name}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.flight_end}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.flight_time_end}</td>
                    </tr>
                    <tr>
                      <th style={{ border: "none" }}></th>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.from_to_start}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{moment(item?.flight_date_start).format("DD/MM/YYYY")}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.cityName1}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.from_start}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.to_start}</td>
                      <td style={{ textAlign: "center" }} colSpan={2}>{item?.client_name}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.pax_num}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.flight_start}</td>
                      <td style={{ textAlign: "center" }} colSpan={1}>{item?.flight_time_start}</td>
                    </tr>
                  </>)
              }
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
