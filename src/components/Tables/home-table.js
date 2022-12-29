import React from "react";
import {
 Card,
 CardHeader,
 CardBody,
 CardTitle,
 Table,
 Row,
 Col
} from "reactstrap";

function homeTable({ t }) {
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
          <tr>
           <td>CMN</td>
           <td>ODYSSE CENTER</td>
           <td>03-janv</td>
           <td>04-janv</td>
           <td>DP</td>
          </tr>
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
           <th>{t("From")} / {t("To")}</th>
           <th>{t("Date")}</th>
           <th>{t("City")}</th>
           <th>{t("From-time")}</th>
           <th>{t("To-time")}</th>
           <th>{t("Flight")}</th>
           <th>{t("Time")}</th>
          </tr>
         </thead>
         <tbody>
          <tr>
           <td>APT / HOTEL</td>
           <td>03-jan</td>
           <td>CASABLANCA</td>
           <td>AEROPORT CASABLANCA</td>
           <td>ODYSSEE CENTER</td>
           <td>AT 410</td>
           <td>18 H 30</td>
          </tr>
          <tr>
           <td>HOTEL / APT</td>
           <td>12-jan</td>
           <td>MARRAKECH</td>
           <td>PALM PLAZA</td>
           <td>Aeroport Marrakech</td>
           <td>ZF 2850</td>
           <td>10 H 20</td>
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

export default homeTable;
