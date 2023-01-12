import React, { useState, useEffect } from "react";
import {
 Card,
 CardHeader,
 CardBody,
 CardTitle,
 Table,
 Row,
 Col
} from "reactstrap";
import _ from "lodash";
import { useTranslation } from 'react-i18next';
import { getListDossier } from "../api/dossier";

function Filters() {
 const { t } = useTranslation();
 const [list, setList] = useState([])
 const loadData = async () => {
  const payload = await getListDossier({});
  setList(payload.dossiers)
 }

 useEffect(() => {
  loadData();
 }, [])
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
        <CardTitle tag="h5">{t("List-Of-Folders")}</CardTitle>
       </CardHeader>
      </Card>
     </Col>
    </Row>
    <Row>
     <Col>
      <Card>
       <CardBody>
        <Row>
         <Col>
          <Table responsive striped>
           <thead className="text-primary">
            <tr>
             <th style={{ textAlign: "center" }}>{t("From")}{"-"}{t("To")}</th>
             <th style={{ textAlign: "center" }}>{t("Client-Ref")}</th>
             <th style={{ textAlign: "center" }}>{t("FullName")}</th>
             <th style={{ textAlign: "center" }}>{t("N° Pax")}</th>
             <th style={{ textAlign: "center" }}>{t("Circuit")}</th>
             <th style={{ textAlign: "center" }}>{t("Category")}</th>
             <th style={{ textAlign: "center" }}>{t("Note")}</th>
             <th style={{ textAlign: "center" }}>{t("Actions")}</th>
            </tr>
           </thead>
           <tbody>
            {list.map((item) => (
             <tr>
              <td style={{ textAlign: "center" }}>
               {(new Date(item.startAt).getDate() < 10 ? "0" : "") + new Date(item.startAt).getDate()}
               -
               {new Date(item.startAt).toLocaleString('default', { month: 'long' }).substring(0, 4)}
               {" / "}
               {(new Date(item.endAt).getDate() < 10 ? "0" : "") + new Date(item.endAt).getDate()}
               -
               {new Date(item.endAt).toLocaleString('default', { month: 'long' }).substring(0, 4)}
              </td>
              <td style={{ textAlign: "center" }}>{item.clientRef}</td>
              <td style={{ textAlign: "center" }}>{item.client}</td>
              <td style={{ textAlign: "center" }}>{item.paxNumber}</td>
              <td style={{ textAlign: "center" }}>{item.circuit}</td>
              <td style={{ textAlign: "center" }}>{item.category === "L" ? "5 ⭐ L" : item.category === "A" ? "4 ⭐ A" : "4 ⭐ B"}</td>
              <td style={{ textAlign: "center" }}>{item.note}</td>
              <td style={{ textAlign: "center" }}>
               <div onClick={() => {

               }}
                type="button"
                className='text-success'>
                <i className="fa fa-cog text-success"></i>
               </div>
              </td>
             </tr>
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
export default Filters;
