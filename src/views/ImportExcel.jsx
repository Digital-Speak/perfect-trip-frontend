import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Table
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { getAgencies } from "api/agency";
import { getlastId } from "../api/auth";
import { FormGroup } from "@mui/material";
import moment from "moment";
import { addNewDossier } from "api/dossier";
import EditableInput from "components/Inputs/EditableInput";
import { importDossierApi } from "api/dossier";
var xlsx = require("xlsx");


function ImportExcel() {

  const { t } = useTranslation();
  const [importedJson, setImportedJson] = useState({});
  const [excelData, setExcelData] = useState([]);
  const [folderId, setFolderId] = useState(null);
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const cellsLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const loadData = async () => {
    const payload = await getAgencies();
    const folderNumber = await getlastId();
    setFolderId(folderNumber?.dossier_num + 1);
    setAgencies(payload?.agencies);
    setSelectedAgency(payload?.agencies[0]?.id);
  }

  const addNew = async () => {
    excelData.forEach(async (dossier, index) => {

      const typeHAB = dossier?.E?.replace(' ', '')?.split('+')
      let HAB = [];
      let habArr = [];
      typeHAB.forEach(hab => {
        const res = hab?.match(/\d+/);
        if (res) {
          res.forEach(el=>{
              habArr.push({
                "label": res['input'],
                "nbr": res[0]
              })
          })
          HAB = habArr;
        } else {
          HAB.push({
            "label": hab,
            "nbr": 1
          })
        }
      });

      console.log({
        dossier_num: folderId + index,
        ref_client: dossier?.B,
        name: dossier?.C,
        category: dossier?.category,
        starts_at: String(dossier?.A),
        agency_id: selectedAgency,
        circuit_id: dossier?.circuit_id,
        circuit_name: dossier?.F,
        typeOfHb: HAB,
        nbrPax: dossier?.H,
        note: '',
        flight_date_start: String(dossier?.A),
        from_to_start: "APT / HOTEL",
        from_to_end: "HOTEL / APT",
        city_id_start: 0,
        city_id_end: 0,
        from_start: "---",
        from_end: "---",
        to_start: "---",
        to_end: "---",
        flight_start: "---",
        flight_end: "---",
        flight_time_start: "00:00",
        flight_time_end: "00:00",
      });
      
      await importDossierApi({
        dossier_num: folderId + index,
        ref_client: dossier?.B,
        name: dossier?.C,
        category: dossier?.category,
        starts_at: String(dossier?.A),
        agency_id: selectedAgency,
        circuit_id: dossier?.circuit_id,
        circuit_name: dossier?.F,
        typeOfHb: HAB,
        nbrPax: dossier?.H,
        note: '',
        flight_date_start: String(dossier?.A),
        from_to_start: "APT / HOTEL",
        from_to_end: "HOTEL / APT",
        city_id_start: 0,
        city_id_end: 0,
        from_start: "---",
        from_end: "---",
        to_start: "---",
        to_end: "---",
        flight_start: "---",
        flight_end: "---",
        flight_time_start: "00:00",
        flight_time_end: "00:00",
      });
    })
  }
  const importIt = () => {
    const data = [];
    importedJson.forEach(row => {
      let dossier = {};
      for (let index = 0; index < row.length; index++) {
        const element = row[index];
        if (index === 0) {
          var date = moment(element.replace('.', '-'), 'DD-MM-YYYY')
          dossier = { ...dossier, [cellsLetter[index]]: moment(date).format("YYYY-MM-DD") }
        }
        else if (index === 3) {
          if (element.toString().toLowerCase().includes("a")) {
            dossier = { ...dossier, [cellsLetter[index]]: element, "category": "A" }
          } else if (element.toString().toLowerCase().includes("b")) {
            dossier = { ...dossier, [cellsLetter[index]]: element, "category": "B" }
          }
          else if (element.toString().toLowerCase().includes("l")) {
            dossier = { ...dossier, [cellsLetter[index]]: element, "category": "L" }
          }
        }
        else if (index === 4) {
          if (element) {
            const typeHab = element.split('+');
            typeHab.forEach(hab => {
              console.log(hab.match(/\d+/) && hab.match(/\d+/)[0])
            });
            console.log(typeHab);
          }
          dossier = { ...dossier, [cellsLetter[index]]: element }
        } else if (index === 5) {
          let circuitId = -1;
          if (element?.toString().replaceAll(' ', '').toLowerCase() === "grt" || element?.toString().replaceAll(' ', '').toLowerCase() === "grantour+enrak") {
            circuitId = 1;
          }
          else if (element?.toString().replaceAll(' ', '').toLowerCase() === "grtpretourrak" || element?.toString().replaceAll(' ', '').toLowerCase() === "grantour") {
            circuitId = 2;
          }
          else if (element?.toString().replaceAll(' ', '').toLowerCase() === "iyk" || element?.toString().replaceAll(' ', '').toLowerCase() === "imykpretourrak1") {
            circuitId = 3;
          }
          else if (element?.toString().replaceAll(' ', '').toLowerCase() === "imykpretourrak2") {
            circuitId = 4;
          }
          else if (element?.toString().replaceAll(' ', '').toLowerCase() === "iyk+encmn" || element?.toString().replaceAll(' ', '').toLowerCase() === "imykconcmn") {
            circuitId = 5;
          }
          else if (element?.toString().replaceAll(' ', '').toLowerCase() === "impynorth") {
            circuitId = 6;
          }
          else if (element?.toString().replaceAll(' ', '').toLowerCase() === "reinosnomadas") {
            circuitId = 7;
          }
          else if (element?.toString().replaceAll(' ', '').toLowerCase() === "rakcondesierto") {
            circuitId = 8;
          }
          dossier = { ...dossier, [cellsLetter[index]]: element, "circuit_id": circuitId }
        }
        else {
          dossier = { ...dossier, [cellsLetter[index]]: element }
        }
      }
      data.push(dossier);
    });
    setExcelData(data);
  }

  console.log(excelData)

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });
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
                    <form style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="upload">Upload File</label>
                      <input
                        type="file"
                        name="upload"
                        id="upload"
                        className="btn btn-border"
                        onChange={readUploadFile}
                        style={{ width: "17rem" }}
                      />
                    </form>
                  </Col>
                  <Col md="6">
                    <Button onClick={importIt} className="btn btn-info btn-block">Import</Button>
                  </Col>
                  <Col md="6">
                    <Button onClick={addNew} className="btn btn-success btn-block">Save</Button>
                  </Col>
                </Row>
                <Row>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Table
                  responsive
                  style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}
                >
                  <thead className="text-primary">
                    <tr>
                      <th>{t("From")}</th>
                      <th>{t("Client-Ref")}</th>
                      <th>{t("FullName")}</th>
                      <th>{t("Cat")}</th>
                      <th>{t("Type-HB")}</th>
                      <th>{t("Circuit")}</th>
                      <th>{t("Pax-Number")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      excelData?.length !== 0 &&
                      excelData.map((element, index) => (
                        <tr key={index}><td>{element?.A}</td>
                          <td>
                            <EditableInput
                              disabled={false}
                              text={element?.B}
                              onTextChange={(newText) => {
                                let newData = [...excelData];
                                let newRow = { ...element, B: newText }
                                newData[index] = newRow;
                                setExcelData(newData);
                              }} />
                          </td>
                          <td>
                            <EditableInput
                              disabled={false}
                              text={element?.C}
                              onTextChange={(newText) => {
                                let newData = [...excelData];
                                let newRow = { ...element, C: newText }
                                newData[index] = newRow;
                                setExcelData(newData);
                              }} />
                          </td>
                          <td>
                            <EditableInput
                              disabled={false}
                              text={element?.D}
                              onTextChange={(newText) => {
                                let newData = [...excelData];
                                let newRow = { ...element, D: newText }
                                newData[index] = newRow;
                                setExcelData(newData);
                              }} />
                          </td>
                          <td>
                            <EditableInput
                              disabled={false}
                              text={element?.E}
                              onTextChange={(newText) => {
                                let newData = [...excelData];
                                let newRow = { ...element, E: newText }
                                newData[index] = newRow;
                                setExcelData(newData);
                              }} />
                          </td>
                          <td>
                            <EditableInput
                              disabled={false}
                              text={element?.F}
                              onTextChange={(newText) => {
                                let newData = [...excelData];
                                let newRow = { ...element, F: newText }
                                newData[index] = newRow;
                                setExcelData(newData);
                              }} />
                          </td>
                          <td>
                            <EditableInput
                              disabled={false}
                              text={element?.H}
                              onTextChange={(newText) => {
                                let newData = [...excelData];
                                let newRow = { ...element, H: newText }
                                newData[index] = newRow;
                                setExcelData(newData);
                              }} />
                          </td>
                        </tr>
                      ))
                    }

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
export default ImportExcel;
