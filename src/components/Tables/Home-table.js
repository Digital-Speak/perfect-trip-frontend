import React, { useEffect, useState } from "react";
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

function HomeTable({
  t,
  selectedCircuit,
  setNewClient,
  newClient,
  circuitDates,
  hotels,
  circuit,
  setCircuit,
  addNewHotel
}) {
  const [flights, setFlights] = useState({
    start: {
      fromTo: "APT / HOTEL",
      city: "CASABLANCA",
      from: "AEROPORT CASABLANCA",
      to: "ODYSSEE CENTER",
      flight: "AT 410",
      time: "18 H 30",
    },
    end: {
      fromTo: "HOTEL / APT",
      city: "MARRAKECH",
      from: "PALM PLAZA",
      to: "Aeroport Marrakech",
      flight: "ZF 2850",
      time: "10 H 20",
    }
  });

  const renderRegime = (cityId) => <EditableSelect
    data={[{ label: "PC" }, { label: "DP" }, { label: "BB" }]}
    text={"DP"}
    t={t}
    onTextChange={(data) => {
      updateData(cityId, "regime", data)
    }} />

  const renderHotel = (cityId, hotels, slectedHotel = "") => {
    const newHotels = []
    hotels.forEach(hotel => {
      newHotels.push({
        label: hotel.hotelName
      })
    });

    slectedHotel = newHotels[0].label;
    return <EditableSelect
      data={newHotels}
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

  const renderCity = (city) => {
    const cities = city.split(" ");

    if (cities.length === 2) {
      return <EditableSelect
        data={cities.map((item) => {
          return { label: item }
        })}
        text={cities[0]}
        t={t}
        onTextChange={(data) => {
          console.log(data)
        }} />
    }
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
    const newData = [];

    let startDate = circuitDates.start;
    let grouped = _.mapValues(_.groupBy(hotels, 'cityName'), clist => clist.map(city => _.omit(city, 'cityName')));

    Object.keys(grouped).forEach((item, index) => {
      let endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + parseInt(grouped[item][0].numberOfNights)));

      newData.push({
        id: grouped[item][0].cityId,
        city: item,
        hotels: grouped[item],
        regimgeData: "DP",
        regime: renderRegime(grouped[item][0].cityId),
        selectedHotel: grouped[item][0].hotelName,
        from:
          `${(new Date(startDate).getDate() < 10 ? "0" : "") + new Date(startDate).getDate()}
     - 
     ${new Date(startDate).toLocaleString('default', { month: 'long' }).substring(0, 4)}`,
        to:
          `${(new Date(endDate).getDate() < 10 ? "0" : "") + new Date(endDate).getDate()} 
    - 
    ${new Date(endDate).toLocaleString('default', { month: 'long' }).substring(0, 4)}`
      })

      startDate = endDate;
      if (index === parseInt(Object.keys(grouped).length - 1)) {
        setNewClient({ ...newClient, endDate: endDate })
      }
    })

    setCircuit(newData)
  }, [hotels, t, circuitDates.start]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">{t("Hotels")}</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
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
                    {selectedCircuit !== "" && circuit.length !== 0 && circuit.map((element, index) => (
                      <tr>
                        <td>{renderCity(element.city)}</td>
                        <td>{renderHotel(element.hotels[0].cityId, element.hotels, element.hotel)}</td>
                        <td>{index !== 0 ? (element.from) :
                          <EditableDatePicker selectedDate={circuitDates.start} t onDateChange={(date) => {
                            console.log(date)
                          }} />} </td>
                        <td>{index !== circuit.length - 1 ? (element.to) :
                          <EditableDatePicker selectedDate={circuitDates.end} t onDateChange={(date) => {
                            console.log(date)
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
              <CardBody>
                <Table responsive>
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
                      <td><EditableInput text={flights.start.fromTo} onTextChange={(newText) => { setFlights({ ...flights, start: { ...flights.start, fromTo: newText } }) }} /></td>
                      <td>{new Date(circuitDates.start).getDate()}/{new Date(circuitDates.start).toLocaleString('default', { month: 'long' }).substring(0, 4)}</td>
                      <td><EditableInput text={flights.start.city} onTextChange={(newText) => { setFlights({ ...flights, start: { ...flights.start, city: newText } }) }} /></td>
                      <td><EditableInput text={flights.start.from} onTextChange={(newText) => { setFlights({ ...flights, start: { ...flights.start, from: newText } }) }} /></td>
                      <td><EditableInput text={flights.start.to} onTextChange={(newText) => { setFlights({ ...flights, start: { ...flights.start, to: newText } }) }} /></td>
                      <td><EditableInput text={flights.start.flight} onTextChange={(newText) => { setFlights({ ...flights, start: { ...flights.start, flight: newText } }) }} /></td>
                      <td><EditableInput text={flights.start.time} onTextChange={(newText) => { setFlights({ ...flights, start: { ...flights.start, time: newText } }) }} /></td>
                    </tr>
                    <tr>
                      <td><EditableInput text={flights.end.fromTo} onTextChange={(newText) => { setFlights({ ...flights, end: { ...flights.end, fromTo: newText } }) }} /></td>
                      <td>{new Date(circuitDates.end).getDate()}/{new Date(circuitDates.end).toLocaleString('default', { month: 'long' }).substring(0, 4)}</td>
                      <td><EditableInput text={flights.end.city} onTextChange={(newText) => { setFlights({ ...flights, end: { ...flights.end, city: newText } }) }} /></td>
                      <td><EditableInput text={flights.end.from} onTextChange={(newText) => { setFlights({ ...flights, end: { ...flights.end, from: newText } }) }} /></td>
                      <td><EditableInput text={flights.end.to} onTextChange={(newText) => { setFlights({ ...flights, end: { ...flights.end, to: newText } }) }} /></td>
                      <td><EditableInput text={flights.end.flight} onTextChange={(newText) => { setFlights({ ...flights, end: { ...flights.end, flight: newText } }) }} /></td>
                      <td><EditableInput text={flights.end.time} onTextChange={(newText) => { setFlights({ ...flights, end: { ...flights.end, time: newText } }) }} /></td>
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

export default HomeTable;
