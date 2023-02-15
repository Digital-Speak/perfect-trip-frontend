import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  Col
} from "reactstrap";
import EditableInput from "../Inputs/EditableInput"
import CustomEditableSelect from "components/Inputs/CustomEditableSelect";
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { getHotels } from "api/hotel";
import moment from "moment";
import { message } from "antd";

function SpecialCircuit({
  t,
  cities,
  circuitDates,
  flights,
  newClient,
  specialCircuitsData,
  setNewClient,
  setSpecialCircuitsData,
  setFlights,
  className,
}) {
  const [hotels, setHotels] = useState([]);
  const [newCircuitRow, setNewCircuitRow] = useState({
    id: -1,
    city: {
      name: "",
      id: -1
    },
    hotel: {
      name: "",
      id: -1,
      list: []
    },
    regime: {
      name: "",
    },
    startedAt: new Date(),
    endedAt: new Date()
  });

  useEffect(() => {
    if (newClient?.startDate == null) return;
    if (parseInt(specialCircuitsData?.length) === 0) {
      setNewCircuitRow({
        ...newCircuitRow,
        startedAt: newClient?.startDate,
        endedAt: new Date(new Date(newClient?.startDate).setDate(newClient?.startDate.getDate() + 1))
      });

      setFlights({
        ...flights,
        flight_date_end: new Date(new Date(newClient?.startDate).setDate(newClient?.startDate.getDate() + 1))
      })
    } else if (parseInt(specialCircuitsData?.length) !== 0) {
      const newData = [];
      specialCircuitsData.forEach((item, index) => {
        if (parseInt(index) === 0) {
          newData.push({
            ...item,
            startedAt: newClient?.startDate
          })
        }
      });
      setSpecialCircuitsData(newData);
    }
  }, [newClient?.startDate])

  useEffect(() => {
    if (newClient?.startDate != null && parseInt(specialCircuitsData?.length) !== 0) {
      setFlights({
        ...flights,
        flight_date_end: new Date(specialCircuitsData[specialCircuitsData?.length - 1]?.to)
      });
    }
  }, [specialCircuitsData.length, specialCircuitsData[specialCircuitsData.length - 1]?.to]);


  const renderCities = (defaultValue = newCircuitRow.city.name, edit = false, id = -1) => {
    const data = []
    cities.forEach(city => {
      data.push({
        label: city.name
      })
    });
    return <Autocomplete
      freeSolo
      id="cities"
      options={data}
      sx={{ width: "auto" }}
      value={defaultValue}
      inputValue={defaultValue}
      disableClearable={true}
      renderInput={(params) =>
        <TextField
          fullWidth
          {...params}
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }} />}
      onInputChange={async (event, newInputValue) => {
        const targetCity = cities.filter((city => city.name === newInputValue));
        if (parseInt(targetCity.length) !== 0) {
          const payload = await getHotels();
          if (!payload.success) return setHotels([]);
          const listOfHotels = payload?.hotels?.filter((hotel) =>
            newClient?.cat?.id !== "X" ?
              hotel?.stars?.split("")[1] === newClient?.cat?.id &&
              parseInt(hotel?.city_id) === parseInt(targetCity[0]?.id) : true &&
              parseInt(hotel?.city_id) === parseInt(targetCity[0]?.id)
          );
          setHotels(listOfHotels);
          if (edit === false) {
            if (payload.success) {
              setNewCircuitRow({
                ...newCircuitRow,
                city: {
                  id: targetCity[0]?.id,
                  name: targetCity[0]?.name
                },
                hotel: {
                  id: -1,
                  name: "",
                  list: listOfHotels
                }
              });
            };
          } else {
            updateFeild(id, targetCity[0]?.name, "cityName");
          }
        }
      }}
    />
  }

  const renderEndDate = (defaultValue = newCircuitRow.endedAt, edit = false, id = -1) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          inputFormat={"DD/MM/YYYY"}
          value={moment(defaultValue).format("MM/DD/YYYY")}
          onChange={(newValue) => {
            const newDate = new Date(newValue.$d);
            if (edit === false) {
              setNewCircuitRow({
                ...newCircuitRow,
                endedAt: newDate
              })
            } else {
              updateFeild(id, newDate, "to");
            }
          }}
          renderInput={(params) => <TextField style={{ "width": "100%" }} {...params} />}
        />
      </LocalizationProvider>
    )
  }

  const renderStartDate = (defaultValue = newCircuitRow.startedAt, edit = false, id = -1) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          inputFormat={"DD/MM/YYYY"}
          value={moment(defaultValue).format("MM/DD/YYYY")}
          onChange={(newValue) => {
            const newDate = new Date(newValue.$d);
            if (edit === false) {
              setNewCircuitRow({
                ...newCircuitRow,
                startedAt: newDate
              })
            } else {
              updateFeild(id, newDate, "from");
            }
          }}
          renderInput={(params) => <TextField style={{ "width": "100%" }} {...params} />}
        />
      </LocalizationProvider>
    )
  }

  const renderHotels = (defaultValue = newCircuitRow.hotel.name, edit = false, id = -1, list = []) => {
    const data = []
    hotels.forEach(hotel => {
      data.push({
        label: `${hotel.name} ${hotel?.stars}`
      })
    });
    return <Autocomplete
      freeSolo
      id="hotels"
      options={list.length !== 0 ? list : data}
      sx={{ width: "auto" }}
      inputValue={defaultValue}
      value={defaultValue}
      disableClearable={true}
      renderInput={(params) =>
        <TextField
          fullWidth
          {...params}
          InputProps={{
            ...params.InputProps,
          }} />}
      onInputChange={(event, newInputValue) => {
        const targetHotel = hotels.filter((hotel => `${hotel.name} ${hotel.stars}` === newInputValue));
        if (parseInt(targetHotel.length) !== 0) {
          if (edit === false) {
            setNewCircuitRow({
              ...newCircuitRow,
              hotel: {
                id: targetHotel[0]?.id,
                name: targetHotel[0]?.name
              }
            })
          }
          else {
            updateFeild(id, targetHotel[0].name, "hotel_name");
          }
        }
      }}
    />
  }

  const renderRegimes = (defaultValue = newCircuitRow.regime.name, edit = false, id = -1) =>
    <Autocomplete
      freeSolo
      id="regimes"
      options={[{ label: "PC" }, { label: "DP" }, { label: "BB" }]}
      sx={{ width: "auto" }}
      inputValue={defaultValue}
      value={defaultValue}
      renderInput={(params) =>
        <TextField
          fullWidth
          {...params}
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }} />}
      onInputChange={(event, newInputValue) => {
        if (edit === false) {
          setNewCircuitRow({
            ...newCircuitRow,
            regime: {
              name: newInputValue
            }
          })
        } else {
          updateFeild(id, newInputValue, "regime");
        }
      }} />

  const formatDate = (unformatted) => {
    const date = new Date(unformatted);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
  }

  const addForm = () => {
    return <tr>
      <td style={{ width: "20%" }}>{renderCities()}</td>
      <td style={{ width: "20%" }}>{renderHotels()}</td>
      <td style={{ width: "20%" }}>{renderStartDate()}</td>
      <td style={{ width: "20%" }}>{renderEndDate()}</td>
      <td style={{ width: "20%" }}>{renderRegimes()}</td>
      <td style={{ width: "20%" }}>
        <Button onClick={() => {
          if (
            parseInt(newCircuitRow.city.id) === -1
            || parseInt(newCircuitRow.hotel.id) === -1
            || newCircuitRow.regime.name === ""
          ) {
            message.error("Merci de remplir tous les champs");
            return;
          }

          setNewClient({ ...newClient, endDate: newCircuitRow?.endedAt })
          setNewCircuitRow({
            ...newCircuitRow,
            city: {
              name: "",
              id: -1
            },
            hotel: {
              name: "",
              id: -1,
              list: []
            },
            regime: {
              name: "",
            },
            startedAt: newCircuitRow?.endedAt,
            endedAt: new Date(new Date(newCircuitRow?.endedAt).setDate(newCircuitRow?.endedAt?.getDate() + 1))
          });

          setSpecialCircuitsData([...specialCircuitsData, {
            id: specialCircuitsData.length + 1,
            cityName: newCircuitRow.city.name,
            cityId: newCircuitRow.city.id,
            dossier_num: newClient.folderNumber,
            extra_nights: 0,
            from: newCircuitRow.startedAt,
            hotel_id: newCircuitRow.hotel.id,
            hotel_name: newCircuitRow.hotel.name,
            regime: newCircuitRow.regime.name,
            to: newCircuitRow.endedAt,
            hotelList: newCircuitRow.hotel.list
          }]);
        }} className="btn btn-success">{t("+")}</Button>
      </td>
    </tr>
  }

  const updateFeild = async (id, value, filed) => {
    if (filed === "cityName") {
      const targetCity = cities.filter((city => city.name === value));
      const payload = await getHotels();
      if (!payload.success) return setHotels([]);
      const listOfHotels = payload?.hotels?.filter((hotel) =>
        newClient?.cat?.id !== "X" ?
          hotel?.stars?.split("")[1] === newClient?.cat?.id &&
          parseInt(hotel?.city_id) === parseInt(targetCity[0]?.id) : true &&
          parseInt(hotel?.city_id) === parseInt(targetCity[0]?.id)
      );
      setHotels(listOfHotels);
      setSpecialCircuitsData((prev) => Object.assign([], {
        ...prev,
        [id - 1]: {
          ...specialCircuitsData[id - 1],
          [filed]: value,
          hotelList: listOfHotels
        }
      }));
    } else {
      setSpecialCircuitsData((prev) => Object.assign([], {
        ...prev, [id - 1]: {
          ...specialCircuitsData[id - 1],
          [filed]: value
        }
      }));
    }
  }

  return (
    <>
      <div className={`content`}>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{t("Hotels")}</CardTitle>
              </CardHeader>
              <CardBody className={` ${className}`}>
                <Table className={` ${className}`} responsive>
                  <thead className="text-primary">
                    <tr>
                      <th style={{ width: "20%" }}>{t("City")}</th>
                      <th style={{ width: "20%" }}>{t("Hotel")}</th>
                      <th style={{ width: "20%" }}>{t("From")}</th>
                      <th style={{ width: "20%" }}>{t("To")}</th>
                      <th style={{ width: "20%" }}>{t("Regime")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addForm()}
                    {parseInt(specialCircuitsData.length) !== 0 && specialCircuitsData?.map((element) =>
                      <tr>
                        <td style={{ width: "20%" }}>{renderCities(element.cityName, true, element.id)}</td>
                        <td style={{ width: "20%" }}>{renderHotels(element.hotel_name, true, element.id, element?.hotelList)}</td>
                        <td style={{ width: "20%" }}>{renderStartDate(element.from, true, element.id)}</td>
                        <td style={{ width: "20%" }}>{renderEndDate(element.to, true, element.id)}</td>
                        <td style={{ width: "20%" }}>{renderRegimes(element.regime, true, element.id)}</td>
                        <td style={{ width: "20%" }}><Button onClick={() => {
                          setSpecialCircuitsData([...specialCircuitsData?.filter((row) => parseInt(row.id) !== parseInt(element.id))]);
                        }} className="btn btn-danger">{t("-")}</Button></td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{t("Flights")}</CardTitle>
              </CardHeader>
              <CardBody className={` ${className}`}>
                <Table className={` ${className}`} responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>{t("From-time")} / {t("To-time")}</th>
                      <th>{t("Date")}</th>
                      <th>{t("City")}</th>
                      <th>{t("From")}</th>
                      <th>{t("To")}</th>
                      <th>{t("Flight")}</th>
                      <th>{t("Time")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <EditableInput
                          text={flights?.from_to_start}
                          onTextChange={(newText) => {
                            setFlights({ ...flights, from_to_start: newText })
                          }} /></td>
                      <td>
                        <input
                          className="border-0"
                          type="date"
                          value={formatDate(flights?.flight_date_start) || formatDate(newClient?.startDate)}
                          onChange={(e) => {
                            setFlights({
                              ...flights,
                              flight_date_start: e.target.value
                            })
                          }} />
                      </td>
                      <td>
                        {cities?.length !== 0 && <CustomEditableSelect
                          data={cities?.length !== 0 ? cities : []}
                          text={cities?.filter(city => parseInt(city.id) === parseInt(flights?.city_id_start))[0]?.name}
                          id={flights.city_id_start}
                          cb={(name, id) => {
                            setFlights({ ...flights, city_id_start: id })
                          }}
                        />}</td>
                      <td><EditableInput
                        text={flights?.from_start}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, from_start: newText })
                        }} /></td>
                      <td><EditableInput
                        text={flights?.to_start}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, to_start: newText })
                        }} /></td>
                      <td><EditableInput
                        text={flights?.flight_start}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, flight_start: newText })
                        }} /></td>
                      <td><input
                        className="border-0"
                        type="time"
                        width="276"
                        value={flights?.flight_time_start}
                        onChange={(e) => {
                          setFlights({ ...flights, flight_time_start: e.target.value })
                        }}
                      /></td>
                    </tr>
                    <tr>
                      <td>
                        <EditableInput
                          text={flights?.from_to_end}
                          onTextChange={(newText) => {
                            setFlights({ ...flights, from_to_end: newText })
                          }} /></td>
                      <td>
                        <input
                          className="border-0"
                          type="date"
                          value={formatDate(flights?.flight_date_end) || formatDate(newClient?.endDate)}
                          onChange={(e) => {
                            setFlights({
                              ...flights,
                              flight_date_end: e.target.value
                            })
                          }} />
                      </td>
                      <td>{cities.length !== 0 && <CustomEditableSelect
                        data={cities?.length !== 0 ? cities : []}
                        text={cities?.filter(city => parseInt(city.id) === parseInt(flights?.city_id_end))[0]?.name}
                        id={flights?.city_id_end}
                        cb={(name, id) => {
                          setFlights({ ...flights, city_id_end: id })
                        }}
                      />}</td>
                      <td><EditableInput
                        text={flights.from_end}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, from_end: newText })
                        }} /></td>
                      <td><EditableInput
                        text={flights.to_end}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, to_end: newText })
                        }} /></td>
                      <td><EditableInput
                        text={flights.flight_end}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, flight_end: newText })
                        }} /></td>
                      <td><input
                        className="border-0"
                        type="time"
                        width="276"
                        value={flights?.flight_time_end}
                        onChange={(e) => {
                          setFlights({ ...flights, flight_time_end: e.target.value })
                        }} /></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SpecialCircuit;
