import React, { useState, useEffect } from "react";
import {
 Card,
 CardHeader,
 CardBody,
 CardTitle,
 Table,
 Row,
 FormGroup,
 Col
} from "reactstrap";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { getListDossier } from "../api/dossier";
import { getCircuit } from "api/dashboard";

function Filters() {
 const { t } = useTranslation();
 const [listBackup, setListBackup] = useState([])
 const [list, setList] = useState([])
 const [circuits, setCircuits] = useState([]);
 const [filterFolders, setFilterFolders] = useState({
  circuit: -1,
  from: new Date(),
  to: new Date(),
 });

 const loadData = async () => {
  const payload = await getListDossier({});
  const circuitsData = await getCircuit();
  setListBackup(payload.dossiers);
  setList(payload.dossiers)
  setCircuits(circuitsData?.circuits);
 }

 const filter = async () => {
  if (filterFolders.circuit == -1) {
   setList(listBackup);

   console.log(new Date(listBackup[0].startAt), new Date(filterFolders.from));
   console.log(new Date(listBackup[0].startAt), new Date(filterFolders.endAt));
   // console.log(listBackup.filter((item) =>
   //  new Date(item.startAt) >= new Date(filterFolders.from)
   //  &&
   //  new Date(item.endAt) <= new Date(filterFolders.from)
   // ));
   // setFilterFolders({
   //  ...filterFolders,
   //  circuit: -1
   // })
  } else {
   setList(listBackup.filter((item) =>
    item.circuit_id == filterFolders.circuit
    // &&
    // new Date(item.startAt) >= new Date(filterFolders.from)
    // &&
    // new Date(item.endAt) <= new Date(filterFolders.from)
   ));
  }


 }
 useEffect(() => {
  loadData();
  filter();
 }, [])

 useEffect(() => {
  filter();
 }, [filterFolders.circuit, filterFolders.from, filterFolders.to])
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
        <Row>
         <Col md="4" xs="4">
          <FormGroup>
           <label>{t("Cat")}</label>
           <select
            className="form-control"
            style={{ height: "55px" }}
            onChange={(event) => {
             setFilterFolders({
              ...filterFolders,
              circuit: event.target.value,
             });
            }} name="" id="">
            <option value={-1}>{t("All")}</option>
            {circuits?.map((item) => (
             <option value={item.id}>{item.name}</option>
            ))}
           </select>
          </FormGroup>
         </Col>
         <Col md="4" xs="12">
          <label>{t("From")}</label>
          <FormGroup>
           <LocalizationProvider
            dateAdapter={AdapterDayjs}
           >
            <DatePicker
             value={filterFolders?.from}
             inputFormat={"DD/MM/YYYY"}
             onChange={(newValue) => {
              const newDate = new Date(newValue.$d);
              setFilterFolders({
               ...filterFolders,
               from: newDate
              })
             }}
             renderInput={(params) => <TextField fullWidth {...params} />}
            />
           </LocalizationProvider>
          </FormGroup>
         </Col>
         <Col md="4" xs="12">
          <label>{t("From")}</label>
          <FormGroup>
           <LocalizationProvider
            dateAdapter={AdapterDayjs}
           >
            <DatePicker
             value={filterFolders?.to}
             inputFormat={"DD/MM/YYYY"}
             onChange={(newValue) => {
              const newDate = new Date(newValue.$d);
              setFilterFolders({
               ...filterFolders,
               to: newDate
              })
             }}
             renderInput={(params) => <TextField fullWidth {...params} />}
            />
           </LocalizationProvider>
          </FormGroup>
         </Col>
        </Row>
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
