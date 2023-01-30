import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import EditableInput from "../Inputs/EditableInput"
import _ from "lodash"
import EditableSelect from "../Inputs/EditableSelect";
import EditableDatePicker from "../Inputs/EditableDatePicker";
import CustomEditableSelect from "components/Inputs/CustomEditableSelect";

function SelectedCircuit({
  t,
  selectedCircuit,
  setNewClient,
  newClient,
  circuitDates,
  hotels,
  circuit,
  setCircuit,
  addNewHotel,
  flights,
  setFlights,
  cities,
  className,
  circuitDetails = [],
  disabled = false,
  isDetails = false
}) {
  const renderRegime = (cityId, regime = "DP") => <EditableSelect
    data={[{ label: "PC" }, { label: "DP" }, { label: "BB" }]}
    text={regime}
    t={t}
    onTextChange={(data) => {
      updateData(cityId, "regime", data);
    }} />

  const renderHotel = (cityId, hotels, slectedHotel, targetCityName = "") => {
    const newHotels = []
    hotels.forEach(hotel => {
      newHotels.push({
        label: hotel.hotelName
      })
    });
    return <EditableSelect
      data={newHotels}
      disabled={disabled}
      text={slectedHotel}
      t={t}
      onTextChange={(data) => {
        const newCircuits = []
        circuit.forEach(function (item) {
          const target = item.hotels.filter((hot) => hot.cityId === cityId && hot.hotelName === data);
          if (target.length !== 0 && item.hotels[0].cityId === cityId) {
            newCircuits.push({
              ...item,
              selectedHotel: data,
            })
          } else if (target.length === 0 && item.hotels[0].cityId === cityId) {
            newCircuits.push({
              ...item,
              selectedHotel: data,
              hotels: [...hotels, { ...hotels[0], hotelName: data }]
            })
          } else {
            newCircuits.push(item)
          }
        })

        addNewHotel(data, hotels[0].cityId)
        setCircuit(newCircuits)
      }} />
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
  const renderCity = (city) => {
    return city
  }

  const updateData = (id, field, data) => {
    if (field === "regime") {
      const newData = [];
      circuit.forEach((item, index) => {
        if (item.id === id) {
          newData.push({
            ...item,
            regime: <EditableSelect
              disabled={disabled}
              data={[{ label: "PC" }, { label: "DP" }, { label: "BB" }]}
              text={data}
              t={t}
              onTextChange={(newText) => {
                updateData(item.id, "regime", newText)
              }} />
          })
        } else {
          newData.push(item)
        }

        if (index === circuit.length - 1) {
          setCircuit(newData);
        }
      })

    }

  }

  useEffect(() => {
    if (hotels.length !== 0) {
      const newData = [];
      let startDate = circuitDates.start;
      let grouped = _.mapValues(_.groupBy(hotels, 'circuit_city_id'), clist => clist.map(city => _.omit(city, 'circuit_city_id')));
      if (isDetails == false) {
        Object.keys(grouped).forEach((item, index) => {
          let endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + parseInt(grouped[item][0].numberOfNights)));
          newData.push({
            id: grouped[item][0].cityId,
            city: grouped[item][0].cityName,
            hotels: grouped[item],
            regimgeData: "DP",
            regime: renderRegime(grouped[item][0].cityId),
            selectedHotel: grouped[item][0].hotelName,
            fromForServer: startDate,
            toForServer: endDate,
            from:
              `${(new Date(startDate).getDate() < 10 ? "0" : "") + new Date(startDate).getDate()}
     - 
     ${new Date(startDate).toLocaleString('default', { month: 'long' }).substring(0, 3)}`,
            to:
              `${(new Date(endDate).getDate() < 10 ? "0" : "") + new Date(endDate).getDate()} 
    - 
    ${new Date(endDate).toLocaleString('default', { month: 'long' }).substring(0, 3)}`
          })

          startDate = endDate;
          if (index === parseInt(Object.keys(grouped).length - 1)) {
            setNewClient({ ...newClient, endDate: endDate })
            setFlights({
              ...flights,
              flight_date_end: endDate
            })
          }
        })
      } else {
        Object.keys(grouped).forEach((item, index) => {
          let endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + parseInt(circuitDetails[index]?.number_of_nights)));
          newData.push({
            id: circuitDetails[index].city_id,
            city: circuitDetails[index].city,
            hotels: grouped[item],
            regimgeData: circuitDetails[index].regime,
            regime: renderRegime(circuitDetails[index].city_id, circuitDetails[index].regime),
            selectedHotel: circuitDetails[index].hotel,
            fromForServer: startDate,
            toForServer: endDate,
            from: `${(new Date(startDate).getDate() < 10 ? "0" : "") + new Date(startDate).getDate()}
                - 
                  ${new Date(startDate).toLocaleString('default', { month: 'long' }).substring(0, 3)}`,
            to:
              `${(new Date(endDate).getDate() < 10 ? "0" : "") + new Date(endDate).getDate()} 
                - 
                ${new Date(endDate).toLocaleString('default', { month: 'long' }).substring(0, 3)}`
          })
          startDate = endDate;
        })
      }
      setCircuit(newData);
    } else {
      setCircuit([])
    }
  }, [hotels.length, hotels.length && hotels[0].hotelId, circuitDates.start]);
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
                      <th>{t("City")}</th>
                      <th>{t("Hotel")}</th>
                      <th>{t("From")}</th>
                      <th>{t("To")}</th>
                      <th>{t("Regime")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCircuit !== "" && circuit?.length !== 0 && circuit?.map((element, index) => (
                      <tr>
                        <td>{renderCity(element.city)}</td>
                        <td>{renderHotel(element?.hotels[0]?.cityId, element.hotels, element.selectedHotel, element.city)}</td>
                        <td>{index !== 0 ? (element.from) :
                          <EditableDatePicker
                            disabled={disabled}
                            selectedDate={circuitDates.start} t onDateChange={(date) => {
                            }} />} </td>
                        <td>{index !== circuit.length - 1 ? (element.to) :
                          <EditableDatePicker
                            disabled={disabled}
                            selectedDate={circuitDates.end}
                            t onDateChange={(date) => {
                            }} />} </td>
                        <td>{element.regime}</td>
                      </tr>
                    ))}
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
                          disabled={disabled}
                          text={flights?.from_to_start}
                          onTextChange={(newText) => {
                            setFlights({ ...flights, from_to_start: newText })
                          }} /></td>
                      <td>
                        <input
                          disabled={disabled}
                          className="border-0"
                          type="date"
                          value={formatDate(flights?.flight_date_start) || formatDate(newClient?.startDate)} onChange={(e) => {
                            setFlights({
                              ...flights,
                              flight_date_start: e.target.value
                            })
                          }} />
                      </td>
                      <td>
                        <CustomEditableSelect
                          data={cities?.length !== 0 ? cities : []}
                          text={cities?.filter(city => parseInt(city.id) === parseInt(flights?.city_id_start))[0]?.name}
                          id={flights.city_id_start}
                          cb={(name, id) => {
                            setFlights({ ...flights, city_id_start: id })
                          }}
                        />
                      </td>
                      <td><EditableInput
                        disabled={disabled}
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
                        disabled={disabled}
                        value={flights?.flight_time_start}
                        onChange={(e) => {
                          setFlights({ ...flights, flight_time_start: e.target.value })
                        }}
                      /></td>
                    </tr>
                    <tr>
                      <td>
                        <EditableInput
                          disabled={disabled}
                          text={flights?.from_to_end}
                          onTextChange={(newText) => {
                            setFlights({ ...flights, from_to_end: newText })
                          }} /></td>
                      <td>
                        <input
                          className="border-0"
                          type="date"
                          disabled={disabled}
                          value={formatDate(flights?.flight_date_end) || formatDate(newClient?.endDate)}
                          onChange={(e) => {
                            setFlights({
                              ...flights,
                              flight_date_end: e.target.value
                            })
                          }} />
                      </td>
                      <td><CustomEditableSelect
                        data={cities?.length !== 0 ? cities : []}
                        text={
                          cities?.filter(city => parseInt(city.id) === parseInt(flights?.city_id_end))[0]?.name
                        }
                        id={flights?.city_id_end}
                        cb={(name, id) => {
                          setFlights({ ...flights, city_id_end: id })
                        }}
                      /></td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights.from_end}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, from_end: newText })
                        }} /></td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights.to_end}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, to_end: newText })
                        }} /></td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights.flight_end}
                        onTextChange={(newText) => {
                          setFlights({ ...flights, flight_end: newText })
                        }} /></td>
                      <td><input
                        disabled={disabled}
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

export default SelectedCircuit;
