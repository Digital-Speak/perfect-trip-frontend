import { useEffect, useState } from "react";
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
import CustomEditableSelect from "components/Inputs/CustomEditableSelect";
import { getHotels } from "api/hotel";

function SelectedCircuitNew({
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
  disabled = false,
}) {
  const [hotelData, setHotelData] = useState([]);

  const loadData = async () => {
    const payload = await getHotels();
    if (!payload.success) setHotelData([]);
    setHotelData(payload?.hotels);
  }
  useEffect(() => {
    loadData();
  }, []);

  const renderRegime = (index, regime = "DP") => <EditableSelect
    data={[{ label: "PC" }, { label: "DP" }, { label: "BB" }]}
    text={regime}
    disabled={disabled}
    t={t}
    onTextChange={(data) => {
      setCircuit((prev) => Object.assign([], {
        ...prev,
        [index]: {
          ...prev[index],
          regime: data
        }
      }));
    }} />

  const renderHotel = (index, hotels, slectedHotel) => {
    const newHotels = [];
    hotels?.forEach(element => {
      newHotels.push({
        label: element.name
      });
    });

    return <EditableSelect
      data={newHotels}
      disabled={false}
      text={slectedHotel}
      t={t}
      onTextChange={(data) => {
        setCircuit((prev) => Object.assign([], {
          ...prev,
          [index]: {
            ...prev[index],
            selectedHotel: data,
          }
        }));

        if (parseInt(index) === 0) {
          setFlights({
            ...flights,
            to_start: data,
          })
        } else if (parseInt(circuit?.length) - 1 === parseInt(index)) {
          setFlights({
            ...flights,
            from_end: data,
          })
        }
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

  const renderCity = (index, city) => {
    const data = []
    cities.forEach(city => {
      data.push({
        label: city.name
      });
    });

    return <EditableSelect
      data={data}
      disabled={false}
      text={city}
      t={t}
      onTextChange={(data) => {
        const targetCity = cities.filter((city => city.name === data));
        let hotelsData = [];
        if (newClient?.cat?.id !== "X") {
          hotelsData = hotelData.filter((hot) =>
            parseInt(hot.city_id) === parseInt(targetCity[0]?.id)
            &&
            hot?.stars?.split("")[1] === newClient?.cat?.id
          );
        } else {
          hotelsData = hotelData.filter((hot) =>
            parseInt(hot.city_id) === parseInt(targetCity[0]?.id)
          );
        }

        if (parseInt(index) === 0) {
          setFlights({
            ...flights,
            city_id_start: targetCity[0]?.id,
            to_start: hotelsData[0]?.name,
          })
        } else if (parseInt(circuit?.length) - 1 === parseInt(index)) {
          setFlights({
            ...flights,
            city_id_end: targetCity[0]?.id,
            from_end: hotelsData[0]?.name,
          })
        }

        setCircuit((prev) => Object.assign([], {
          ...prev,
          [index]: {
            ...prev[index],
            city: targetCity[0]?.name,
            hotels: hotelsData,
            selectedHotel: hotelsData[0]?.name,
          }
        }));
      }} />
  }

  useEffect(() => {
    if (hotels.length !== 0) {
      const newData = [];
      let startDate = circuitDates.start;
      let grouped = _.mapValues(_.groupBy(hotels, 'circuit_city_id'), clist => clist.map(city => _.omit(city, 'circuit_city_id')));

      Object.keys(grouped).forEach((item, index) => {
        let hotelsData = [];
        let endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + parseInt(grouped[item][0].numberOfNights)));
        if (newClient?.cat?.id !== "X") {
          hotelsData = hotelData.filter((hot) =>
            parseInt(hot.city_id) === parseInt(grouped[item][0]?.cityId)
            &&
            hot?.stars?.split("")[1] === newClient?.cat?.id
          );
        } else {
          hotelsData = hotelData.filter((hot) =>
            parseInt(hot.city_id) === parseInt(grouped[item][0]?.cityId)
          );
        }

        newData.push({
          id: grouped[item][0].cityId,
          city: grouped[item][0].cityName,
          hotels: hotelsData,
          regime: "DP",
          selectedHotel: hotelsData[0]?.name,
          fromForServer: startDate,
          toForServer: endDate,
          from: startDate,
          to: endDate
        });

        startDate = endDate;

        if (index === parseInt(Object.keys(grouped).length - 1)) {
          setNewClient({ ...newClient, endDate: endDate })
          setFlights({
            ...flights,
            flight_date_end: endDate,
            city_id_start: newData[0]?.id,
            city_id_end: newData[newData.length - 1]?.id,
            from_end: circuit[parseInt(circuit.length - 1)]?.selectedHotel,
            to_start: circuit[0]?.selectedHotel,
            flight_date_start: newClient?.startDate,
          });
        }
      });

      setFlights({
        ...flights,
        flight_date_end: newData[parseInt(newData.length - 1)]?.toForServer,
        city_id_start: newData[0]?.id,
        city_id_end: newData[newData.length - 1]?.id,
        from_end: newData[parseInt(newData?.length - 1)]?.selectedHotel,
        to_start: newData[0]?.selectedHotel,
        flight_date_start: newData[0]?.fromForServer,
      })

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
              <CardBody className={`${className}`}>
                <Table className={`${className}`} responsive>
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
                      <tr key={index}>
                        <td>{renderCity(index, element.city)}</td>
                        <td>{renderHotel(index, element.hotels, element.selectedHotel)}</td>
                        <td>
                          {(
                            `${(new Date(element.from).getDate() < 10 ? "0" : "") + new Date(element.from).getDate()}
                              - 
                            ${new Date(element.from).toLocaleString('default', { month: 'long' }).substring(0, 3)}`
                          )}
                        </td>
                        <td>
                          {(
                            `${(new Date(element.to).getDate() < 10 ? "0" : "") + new Date(element.to).getDate()}
                              - 
                            ${new Date(element.to).toLocaleString('default', { month: 'long' }).substring(0, 3)}`
                          )}
                        </td>
                        <td>{renderRegime(index, element.regime)}</td>
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
                        {flights?.from_to_start}
                      </td>
                      <td>
                        <input
                          disabled={disabled}
                          className="border-0"
                          type="date"
                          value={formatDate(flights?.flight_date_start)}
                          onChange={(e) => {
                            setFlights({
                              ...flights,
                              flight_date_start: e.target.value
                            })
                          }} />
                      </td>
                      <td>
                        <CustomEditableSelect
                          data={cities?.length !== 0 ? cities : []}
                          disabled={disabled}
                          text={cities?.filter(city => parseInt(city.id) === parseInt(flights?.city_id_start))[0]?.name}
                          id={flights.city_id_start}
                          cb={(name, id) => {
                            setFlights({
                              ...flights,
                              city_id_start: id,
                              to_start: "-"
                            })
                          }}
                        />
                      </td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights?.from_start}
                        onTextChange={(newText) => {
                          if (newText === "" || newText === null) return;
                          setFlights({ ...flights, from_start: newText })
                        }} /></td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights?.to_start}
                        onTextChange={(newText) => {
                          if (newText === "" || newText === null) return;
                          setFlights({ ...flights, to_start: newText })
                        }} /></td>
                      <td><EditableInput
                        text={flights?.flight_start}
                        disabled={disabled}
                        onTextChange={(newText) => {
                          if (newText === "" || newText === null) return;
                          setFlights({ ...flights, flight_start: newText })
                        }} /></td>
                      <td><input
                        className="border-0"
                        type="time"
                        width="276"
                        disabled={disabled}
                        value={flights?.flight_time_start}
                        onChange={(e) => {
                          if (e.target.value === "" || e.target.value === null) return;
                          setFlights({
                            ...flights,
                            flight_time_start: e.target.value,
                            to_end: "-",
                          })
                        }}
                      /></td>
                    </tr>
                    <tr>
                      <td>
                        {flights?.from_to_end}
                      </td>
                      <td>
                        <input
                          className="border-0"
                          type="date"
                          disabled={disabled}
                          value={formatDate(flights?.flight_date_end)}
                          onChange={(e) => {
                            setFlights({
                              ...flights,
                              flight_date_end: e.target.value
                            })
                          }} />
                      </td>
                      <td><CustomEditableSelect
                        data={cities?.length !== 0 ? cities : []}
                        disabled={disabled}
                        text={cities?.filter(city => parseInt(city.id) === parseInt(flights?.city_id_end))[0]?.name}
                        id={flights?.city_id_end}
                        cb={(name, id) => {
                          if (name === "" || name === null) return;
                          setFlights({
                            ...flights,
                            city_id_end: id,
                            from_end: "-"
                          })
                        }}
                      /></td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights.from_end}
                        onTextChange={(newText) => {
                          if (newText === "" || newText === null) return;
                          setFlights({ ...flights, from_end: newText })
                        }} /></td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights.to_end}
                        onTextChange={(newText) => {
                          if (newText === "" || newText === null) return;
                          setFlights({ ...flights, to_end: newText })
                        }} /></td>
                      <td><EditableInput
                        disabled={disabled}
                        text={flights.flight_end}
                        onTextChange={(newText) => {
                          if (newText === "" || newText === null) return;
                          setFlights({ ...flights, flight_end: newText })
                        }} /></td>
                      <td><input
                        disabled={disabled}
                        className="border-0"
                        type="time"
                        width="276"
                        value={flights?.flight_time_end}
                        onChange={(e) => {
                          if (e.target.value === "" || e.target.value === null) return;
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

export default SelectedCircuitNew;
