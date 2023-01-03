// import React, { useState, useEffect } from "react";
// import {
//  Button,
//  Card,
//  CardHeader,
//  CardBody,
//  CardTitle,
//  FormGroup,
//  Form,
//  Input,
//  Row,
//  Col
// } from "reactstrap";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import agences from "../assets/data/agences.json";
// import cats from "../assets/data/cats.json";
// import PaxNumber from "../components/Tables/Pax-Number";
// import HomeTable from "../components/Tables/Home-table";
// import { useTranslation } from 'react-i18next';
// import { getCircuit, postData } from "../api/dashboard";


// function Dashboard() {

//  const { t } = useTranslation();
//  return (
//   <>
//    <div className="content" style={{ "width": "90%", "justifyContent": "center", "marginLeft": "auto", "marginRight": "auto" }}>
//     <Row>
//      <Col md="12">
//       <Card className="card-user">
//        <CardHeader>
//         <CardTitle tag="h5">{t("New-Folder")}</CardTitle>
//        </CardHeader>
//        <CardBody>
//         <Row>
//          <Col md="4"> <FormGroup>
//           <label>{t("Circuit")}</label>
//           <Autocomplete
//            disablePortal
//            id="circuit"
//            options={[{ label: "Par Ville" }, { label: "Par Hotel" }]}
//            sx={{ width: "auto" }}
//            inputValue={""}
//            renderInput={(params) => <TextField {...params} label={t("Select")} />}
//            onInputChange={async (event, newInputValue) => {

//            }}
//           />
//          </FormGroup>
//           <Col>
//            <Row>
//             <Col md="4">
//              <label>{t("From")}</label>
//              <FormGroup>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                <DatePicker
//                 value={new Date()}
//                 inputFormat={"DD/MM/YYYY"}
//                 onChange={(newValue) => {
//                  const newDate = new Date(newValue.$d);
//                  console.log(newDate)
//                 }}
//                 renderInput={(params) => <TextField {...params} />}
//                />
//               </LocalizationProvider>
//              </FormGroup>
//             </Col>
//             <Col md="4">
//              <label>{t("To")}</label>
//              <FormGroup>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                <DatePicker
//                 disabled
//                 value={new Date()}
//                 inputFormat={"DD/MM/YYYY"}
//                 renderInput={(params) => <TextField {...params} />}
//                />
//               </LocalizationProvider>
//              </FormGroup>
//             </Col>
//            </Row>
//           </Col>
//         </Row>
//        </CardBody>
//       </Card>
//      </Col>
//     </Row>
//    </div>
//   </>
//  );
// }

// export default Dashboard;
