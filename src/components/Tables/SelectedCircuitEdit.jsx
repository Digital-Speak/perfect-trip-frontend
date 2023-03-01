import { useEffect } from "react";
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
import EditableSelect from "../Inputs/EditableSelect";
import EditableDatePicker from "../Inputs/EditableDatePicker";
import CustomEditableSelect from "components/Inputs/CustomEditableSelect";
const _ = require('lodash');

function SelectedCircuitEdit({
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
}) {
  const renderRegime = (dossierHotelId, regime = "DP") => <EditableSelect
    data={[{ label: "PC" }, { label: "DP" }, { label: "BB" }]}
    text={regime}
    disabled={disabled}
    t={t}
    onTextChange={(data) => {
      const newData = [];
      circuit.forEach((item, index) => {
        if (item.dossier_hotel_id === dossierHotelId) {
          newData.push({
            ...item,
            regime: data,
          });
        } else {
          newData.push(item)
        }
        if (index === circuit.length - 1) {
          setCircuit(newData);
        }
      })
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

        addNewHotel(data, hotels[0].cityId);
        setCircuit(newCircuits);
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

  useEffect(() => {
    if (hotels.length !== 0) {
      const newData = [];
      circuitDetails?.forEach((item) => {
        newData.push({
          id: item?.city_id,
          hotel_id: item?.hotel_id,
          city_id: item?.city_id,
          city: item?.city,
          dossier_id: item?.dossier_id,
          dossier_hotel_id: item?.dossier_hotel_id,
          hotels: [],
          regime: item?.regime,
          selectedHotel: item?.hotel,
          fromForServer: item?.start_date,
          toForServer: item?.end_date,
          from: `${(new Date(item?.start_date).getDate() < 10 ? "0" : "") + new Date(item?.start_date).getDate()}
                - 
                  ${new Date(item?.start_date).toLocaleString('default', { month: 'long' }).substring(0, 3)}`,
          to:
            `${(new Date(item?.end_date).getDate() < 10 ? "0" : "") + new Date(item?.end_date).getDate()} 
                - 
                ${new Date(item?.end_date).toLocaleString('default', { month: 'long' }).substring(0, 3)}`
        })
      })

      let grouped = _.mapValues(_.groupBy(cities, 'id'), clist => clist.map(city => _.omit(city, 'id')));
      setFlights({
        ...flights,
        city_name_start: grouped[flights?.city_id_start][0]?.name,
        city_name_end: grouped[flights?.city_id_end][0]?.name,
      })

      setCircuit(newData);
    } else {
      setCircuit([]);
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
                    {selectedCircuit !== "" && circuit?.length !== 0 && circuit?.map((element) => (
                      <tr>
                        <td>{element.city}</td>
                        <td>{renderHotel(element?.hotels[0]?.cityId, element.hotels, element.selectedHotel, element.city)}</td>
                        <td>
                          <EditableDatePicker
                            disabled={disabled}
                            selectedDate={element?.fromForServer}
                            t
                            onDateChange={(date) => {
                            }}
                          />
                        </td>
                        <td>
                          <EditableDatePicker
                            disabled={disabled}
                            selectedDate={element?.toForServer}
                            t
                            onDateChange={(date) => {

                            }}
                          />
                        </td>
                        <td>{renderRegime(element?.dossier_hotel_id, element?.regime)}</td>
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
                    <tr className="my-4" style={{
                      height: "20px"
                    }}>
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
                          text={flights?.city_name_start}
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
                        text={flights?.city_name_end}
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

export default SelectedCircuitEdit;
