import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { getAgencies } from "api/agency";
import { FormGroup } from "@mui/material";
import moment from "moment";
import { addNewDossier } from "api/dossier";
var xlsx = require("xlsx");


function ImportExcel() {

  const { t } = useTranslation();
  const [importedJson, setImportedJson] = useState({});
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState();
  const cellsLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const loadData = async () => {
    const payload = await getAgencies();
    setAgencies(payload?.agencies);
    setSelectedAgency(payload?.agencies[0]?.id);
  }

  const addNew = async() => {
     await addNewDossier({
      // dossier_num: folderNumber,
      // ref_client: refClient,
      // name: fullName,
      // category: cat.id,
      // starts_at: String(startDate),
      // ends_at: String(endDate),
      // agency_id: agency.id,
      // circuit_id: circuit.id,
      // circuit_name: circuit.name,
      // hotels_dossier: hotels_dossier,
      // typeOfHb: typeOfHb,
      // nbrPax: newClient?.nbrPax,
      // note: note,
      // extraData: extraData,
      // ...flights,
      // flight_date_start: String(flights.flight_date_start),
      // flight_date_end: String(flights.flight_date_end),
    });
  }
  const importIt = () => {
    importedJson.forEach(row => {
      let dossier = {};
      for (let index = 0; index < row.length; index++) {
        const element = row[index];
        if(index===0){
          var date = moment(element.replace('.','-'), 'DD-MM-YYYY')
          dossier = {...dossier, [cellsLetter[index]]:moment(date).format("YYYY-MM-DD")}            
        }else{
          dossier = {...dossier, [cellsLetter[index]]:element}            
        }
      }
      //api call here:
      console.log(dossier);
    });
    
  }

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];  
        const json = xlsx.utils.sheet_to_json(worksheet,{header:1, blankrows: false});     
        setImportedJson(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
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
              <div className="row px-5">
                <CardHeader>
                  <CardTitle tag="h5">{t("Import-excel")}</CardTitle>
                </CardHeader>
              </div>
              <CardBody >
                <Row>
                  <Col className="mb-3" md="6" >

                    <FormGroup>
                      <label>{t("Agency")}</label>
                      <select
                        className="form-control"
                        style={{ height: "55px" }}
                        onChange={(event) => {
                          setSelectedAgency(event.target.value);
                        }} >
                        {agencies?.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <form style={{display:"flex", flexDirection:"column"}}>
                      <label htmlFor="upload">Upload File</label>
                      <input
                        type="file"
                        name="upload"
                        id="upload"
                        className="btn btn-border"
                        onChange={readUploadFile}
                        style={{width:"17rem"}}
                      />
                    </form>
                  </Col>
                  <Col md="6">
                    <Button onClick={importIt} className="btn btn-info btn-block">Import</Button>
                  </Col>
                </Row>
                <Row>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default ImportExcel;
