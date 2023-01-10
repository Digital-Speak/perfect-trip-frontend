import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import _ from "lodash";
import { useTranslation } from 'react-i18next';
import { getListFlights } from "api/flight";
import { TextField } from "@mui/material";
import { getCities } from "api/city";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
var moment = require("moment");

function Flight() {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [cities, setCities] = useState([])
  const [filterState, setFilterState] = useState({
    cityId: -1,
    from: null,
    to: null
  });

  const loadData = async () => {
    const payload = await getListFlights();
    const _cities = await getCities();
    setCities(_cities?.cities);
    setList(payload?.flights)
    setFilteredList(payload?.flights)
  }

  const filter = () => {
    const filtered = [];
    list.forEach((element, index) => {
      if (filterState?.cityId == -1) {
        if (filterState?.from === null && filterState?.to === null) {
          filtered.push(element);
        } else {
          if (filterState?.from !== null && filterState?.to === null) {
            if (new Date(filterState?.from) <= new Date(element?.flight_date_start)) {
              filtered.push(element)
            }
          } else if (filterState?.from === null && filterState?.to !== null) {
            if (new Date(filterState?.to) >= new Date(element?.flight_date_start)) {
              filtered.push(element)
            }
          } else if (filterState?.from !== null && filterState?.to !== null) {
            if ((new Date(filterState?.from) <= new Date(element?.flight_date_start)) && (new Date(filterState?.to) >= new Date(element?.flight_date_start))) {
              filtered.push(element)
            }
          }
        }
      }
      if (element?.city_id_start === filterState?.cityId) {
        if (filterState?.from === null && filterState?.to === null) {
          filtered.push(element);
        } else {
          if (filterState?.from !== null && filterState?.to === null) {
            if (new Date(filterState?.from) <= new Date(element?.flight_date_start)) {
              filtered.push(element)
            }
          } else if (filterState?.from === null && filterState?.to !== null) {
            if (new Date(filterState?.to) >= new Date(element?.flight_date_start)) {
              filtered.push(element)
            }
          } else if (filterState?.from !== null && filterState?.to !== null) {
            if ((new Date(filterState?.from) <= new Date(element?.flight_date_start)) && (new Date(filterState?.to) >= new Date(element?.flight_date_start))) {
              filtered.push(element)
            }
          }
        }
      }
      if (list.length - 1 === index) {
        setFilteredList(filtered);
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
            <Card style={{
              paddingTop: "15px",
              paddingBottom: "15px",
            }}>
              <CardHeader>
                <CardTitle tag="h5">{t("Filter-flights")}</CardTitle>
              </CardHeader>
              <CardBody >
                <Row>
                  <Col md="4"> <FormGroup>
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
                        <option value={-1}>{"All"}</option>
                        {cities.length !== 0 && cities.map((city) =>
                        (
                          <option value={city?.id}>{city?.name}</option>
                        ))
                        }
                      </select>
                    </FormGroup>
                  </FormGroup>
                  </Col>
                  <Col md="4" xs="12">
                    <label>{t("From")}</label>
                    <FormGroup>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          value={moment(filterState?.from).format("DD/MM/YYYY")}
                          inputFormat={"DD/MM/YYYY"}
                          onChange={(newValue) => {
                            const newDate = new Date(newValue.$d);
                            setFilterState({
                              ...filterState,
                              from: newDate
                            })
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </LocalizationProvider>
                    </FormGroup>
                  </Col>
                  <Col md="4" xs="12">
                    <label>{t("To")}</label>
                    <FormGroup>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          value={moment(filterState?.to).format("DD/MM/YYYY")}
                          inputFormat={"DD/MM/YYYY"}
                          onChange={(newValue) => {
                            const newDate = new Date(newValue.$d);
                            setFilterState({
                              ...filterState,
                              to: formatDate(newDate)
                            })
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
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
                    <Table responsive >
                      <thead className="text-primary">
                        <tr>
                          <th style={{ textAlign: "center" }}>{t("From")}{"-"}{t("To")}</th>
                          <th style={{ textAlign: "center" }}>{t("Date")}</th>
                          <th style={{ textAlign: "center" }}>{t("City")}</th>
                          <th style={{ textAlign: "center" }}>{t("From")}</th>
                          <th style={{ textAlign: "center" }}>{t("To")}</th>
                          <th style={{ textAlign: "center" }}>{t("Flight")}</th>
                          <th style={{ textAlign: "center" }}>{t("Time")}</th>
                          <th style={{ textAlign: "center" }}>{t("Actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredList && filteredList.length !== 0 && filteredList.map((item, index) => (
                          <>
                            <tr style={index == 0 || index % 2 == 0 ? { backgroundColor: "#EFEFEF" } : {}}>
                              <td style={{ textAlign: "center" }}>{item.from_to_start}</td>
                              <td style={{ textAlign: "center" }}>{moment(item.flight_date_start).format("DD/MM/YYYY")}</td>
                              <td style={{ textAlign: "center" }}>{item.cityName1}</td>
                              <td style={{ textAlign: "center" }}>{item.from_start}</td>
                              <td style={{ textAlign: "center" }}>{item.to_start}</td>
                              <td style={{ textAlign: "center" }}>{item.flight_start}</td>
                              <td style={{ textAlign: "center" }}>{item.flight_time_start}</td>
                              <td rowSpan={2} style={{ textAlign: "center" }}>
                                <div onClick={() => {

                                }}
                                  type="button"
                                  className='text-success'>
                                  <i className="fa fa-cog text-success"></i>
                                </div>
                              </td>
                            </tr>
                            <tr style={index === 0 || index % 2 === 0 ? { backgroundColor: "#EFEFEF" } : {}}>
                              <td style={{ textAlign: "center" }}>{item.from_to_end}</td>
                              <td style={{ textAlign: "center" }}>{moment(item.flight_date_end).format("DD/MM/YYYY")}</td>
                              <td style={{ textAlign: "center" }}>{item.cityName2}</td>
                              <td style={{ textAlign: "center" }}>{item.from_end}</td>
                              <td style={{ textAlign: "center" }}>{item.to_end}</td>
                              <td style={{ textAlign: "center" }}>{item.flight_end}</td>
                              <td style={{ textAlign: "center" }}>{item.flight_time_end}</td>
                            </tr>
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
    </>
  );
}
export default Flight;
