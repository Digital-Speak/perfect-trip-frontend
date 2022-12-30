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
function HomeTable({ t, selectedCircuit, circuitDates }) {
 useEffect(() => {

 }, [selectedCircuit]);

 const [circuit, setCircuit] = useState([{
  city: "CMN",
  hotel: "ODYSSE CENTER",
  from: "03-janv",
  to: "04-janv",
  regime: "DP",
 }]);

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
           <td><EditableInput text={flights.start.fromTo} onTextChange={(newText) => {}} /></td>
           <td>{new Date(circuitDates.start).getDate()}/{new Date(circuitDates.start).toLocaleString('default', { month: 'long' }).substring(0, 4)}</td>
           <td><EditableInput text={flights.start.city} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.from} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.to} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.flight} onTextChange={(newText) => { }} /></td>
           <td><EditableInput text={flights.start.time} onTextChange={(newText)=> {}} /></td>
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
