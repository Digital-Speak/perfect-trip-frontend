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
import EditableInput from "../../components/Inputs/EditableInput"
import _ from "lodash"
import EditableSelect from "../Inputs/EditableSelect";

function HomeTable({ t, selectedCircuit, setNewClient, newClient, circuitDates, hotels }) {
 useEffect(() => {
  const newData = [];
  var grouped = _.mapValues(_.groupBy(hotels, 'cityName'), clist => clist.map(city => _.omit(city, 'cityName')));

  let startDate = circuitDates.start;
  Object.keys(grouped).forEach((item, index) => {
   let endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + parseInt(grouped[item][0].numberOfNights)));

   if (index === parseInt(Object.keys(grouped).length-1)) {
    setNewClient({ ...newClient, endDate: endDate })
    console.log(endDate);
   }
   
   newData.push({
    city: item,
    hotel: grouped[item].length === 1 ? grouped[item][0].hotelName :
     <EditableSelect
      data={[{ label: grouped[item][0].hotelName }, { label: grouped[item][1].hotelName }]}
      text={grouped[item][0].hotelName}
      t={t}
      cb={(data) => { }} />,
    regime: <EditableSelect
     data={[{ label: "PC" }, { label: "DP" }, { label: "BB" }, ]}
     text={"DP"}
     t={t}
     cb={(data) => { }} />,

    from: 
     `${(new Date(startDate).getDate() < 10 ? "0" : "") + new Date(startDate).getDate()}
     - 
     ${new Date(startDate).toLocaleString('default', { month: 'long' }).substring(0, 4)}`,
    to: 
     `${(new Date(endDate).getDate() < 10 ? "0" : "")  + new Date(endDate).getDate() } 
    - 
    ${new Date(endDate).toLocaleString('default', { month: 'long' }).substring(0, 4)}`
   })

   startDate = endDate;
  })

  setCircuit(newData)
}, [hotels, t, circuitDates.start]);

 const [circuit, setCircuit] = useState([]);

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
          {selectedCircuit !== "" && circuit.length !== 0 && circuit.map((element) => (
           <tr>
            <td>{element.city}</td>
            <td>{element.hotel}</td>
            <td>{element.from}</td>
            <td>{element.to}</td>
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
        <CardTitle tag="h4">Hoteles</CardTitle>
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
           <td><EditableInput text={flights.start.fromTo} onTextChange={(newText) => { }} /></td>
           <td>{new Date(circuitDates.start).getDate()}/{new Date(circuitDates.start).toLocaleString('default', { month: 'long' }).substring(0, 4)}</td>
           <td><EditableInput text={flights.start.city} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.from} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.to} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.flight} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.time} onTextChange={(newText) => { }} /></td>
          </tr>
          <tr>
           <td><EditableInput text={flights.end.fromTo} onTextChange={(newText) => { }} /></td>
           <td>{new Date(circuitDates.end).getDate()}/{new Date(circuitDates.end).toLocaleString('default', { month: 'long' }).substring(0, 4)}</td>
           <td><EditableInput text={flights.end.city} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.end.from} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.end.to} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.end.flight} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.end.time} onTextChange={(newText) => { }} /></td>
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