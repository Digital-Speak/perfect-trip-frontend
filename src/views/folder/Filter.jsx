import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
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
import { getListDossier } from "../../api/dossier";
import { getCircuit } from "api/dashboard";
import ReactHTMLTableToExcel from 'html-to-excel-react';

const moment = require("moment");

function Filters() {
  const { t } = useTranslation();
  const { push } = useHistory()
  const [list, setList] = useState([])
  const [circuits, setCircuits] = useState([]);
  const [filterFolders, setFilterFolders] = useState({
    circuit: -1,
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const loadData = async () => {
    const payload = await getListDossier({});
    const circuitsData = await getCircuit(true);
    setCircuits(circuitsData?.circuits);

    const newState = [];
    payload?.dossiers?.forEach((item, index) => {
      if (
        moment(item.startAt).isSameOrAfter(filterFolders.from, "day")
        && moment(item.startAt).isSameOrBefore(filterFolders.to, "day")
      ) {
        if (parseInt(filterFolders.circuit) === -1) {
          newState.push(item);
        } else if (parseInt(item.circuit_id) === parseInt(filterFolders.circuit)) {
          newState.push(item);
        }
      }

      if (parseInt(index) === parseInt(payload?.dossiers?.length - 1)) {
        setList(newState);
      }
    });
  }

  const getDetails = (item) => (
    <td style={{ textAlign: "center" }} onClick={() => {
    }}><i className="fa fa-envelope cellHoverMode"
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        sessionStorage.setItem("TargetFolder", item?.clientRef);
        push("/admin/details")
      }}
      /></td>
  )

  useEffect(() => {
    loadData();
  }, [
    filterFolders.circuit,
    filterFolders.from,
    filterFolders.to
  ]);

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
            <Card>
              <CardHeader>
                <div className="row px-5">
                  <CardHeader>
                    <CardTitle tag="h5">{t("Filter Circuits")}</CardTitle>
                  </CardHeader>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success ml-auto"
                    table="table-to-xls"
                    filename={`Circuits_${new Date().getTime()}`}
                    sheet="tablexls"
                    buttonText={<i className="fa fa-file-excel fa-3x"></i>}
                  />
                </div>
              </CardHeader>
              <CardBody>
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
                          <option value={item.id} key={item.id}>{item.name}</option>
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
              </CardBody>
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
                          <th style={{ textAlign: "center", width: "200px" }}>{t("From")}{"-"}{t("To")}</th>
                          <th style={{ textAlign: "center" }}>{t("Circuit")}</th>
                          <th style={{ textAlign: "center" }}>{t("Client-Ref")}</th>
                          <th style={{ textAlign: "center" }}>{t("FullName")}</th>
                          <th style={{ textAlign: "center" }}>{t("N° Pax")}</th>
                          <th style={{ textAlign: "center" }}>{t("Category")}</th>
                          <th style={{ textAlign: "center" }}>{t("Note")}</th>
                          <th style={{ textAlign: "center" }}>{t("Actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list.map((item, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center", width: "200px" }}>
                              {(new Date(item.startAt).getDate() < 10 ? "0" : "") + new Date(item.startAt).getDate()}
                              -
                              {new Date(item.startAt).toLocaleString('default', { month: 'long' }).substring(0, 4)}
                              {" / "}
                              {(new Date(item.endAt).getDate() < 10 ? "0" : "") + new Date(item.endAt).getDate()}
                              -
                              {new Date(item.endAt).toLocaleString('default', { month: 'long' }).substring(0, 4)}
                            </td>
                            <td style={{ textAlign: "center" }}>{item.circuit}</td>
                            <td style={{ textAlign: "center" }}>{item.clientRef}</td>
                            <td style={{ textAlign: "center" }}>{item.client}</td>
                            <td style={{ textAlign: "center" }}>{item.paxNumber}</td>
                            <td style={{ textAlign: "center" }}>{item.category === "L" ? "5 ⭐ L" : item.category === "A" ? "4 ⭐ A" : "4 ⭐ B"}</td>
                            <td style={{ textAlign: "center" }}>{item.note}</td>
                            {getDetails(item)}
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
      <table
        className='d-none'
        id="table-to-xls"
        style={{
          "border": "1px solid black",
          fontSize: "14px"
        }}>
        <thead className="text-primary">
          <tr></tr>
          <tr></tr>
          <tr>
            <th style={{ border: "none" }}></th>
            <td style={{ textAlign: "center", border: "none" }} colSpan={3}>Filtres: </td>
          </tr>
          <tr style={{ border: "0.5px solid black", fontSize: "15px" }}>
            <th style={{ border: "none" }}></th>
            {(
              <td style={{ border: "none", textAlign: "center" }} colSpan={2}>
                {t("From")}:
                <span style={{ fontWeight: "bold" }} >{t(` ${moment(new Date(filterFolders.from)).format("DD/MM/YYYY")}`)}</span>
              </td>
            )}
            {(
              <td style={{ border: "none", textAlign: "center" }} colSpan={2}>
                {t("To")}:
                <span style={{ fontWeight: "bold" }} >{t(` ${moment(new Date(filterFolders.to)).format("DD/MM/YYYY")}`)}</span>
              </td>
            )}
          </tr>
          <tr></tr>
          <tr style={{
            backgroundColor: "lightgray"
          }}>
            <th style={{ border: "none", backgroundColor: "white" }}></th>
            <th style={{ textAlign: "center", width: "200px" }} colSpan={2}>{t("From")}{"-"}{t("To")}</th>
            <th style={{ textAlign: "center" }} colSpan={3}>{t("Circuit")}</th>
            <th style={{ textAlign: "center" }} colSpan={2}>{t("Client-Ref")}</th>
            <th style={{ textAlign: "center" }} colSpan={2}>{t("FullName")}</th>
            <th style={{ textAlign: "center" }}>{t("N° Pax")}</th>
            <th style={{ textAlign: "center" }}>{t("Category")}</th>
            <th style={{ textAlign: "center" }} colSpan={3}>{t("Note")}</th>
          </tr>
        </thead>
        <tbody>
          {list && list?.length !== 0 && list?.map((item, index) => (
            <tr key={index}>
              <th style={{ border: "none" }}></th>
              <td style={{ textAlign: "center", width: "200px" }} colSpan={2}>
                {(new Date(item.startAt).getDate() < 10 ? "0" : "") + new Date(item.startAt).getDate()}
                -
                {new Date(item.startAt).toLocaleString('default', { month: 'long' }).substring(0, 4)}
                {" / "}
                {(new Date(item.endAt).getDate() < 10 ? "0" : "") + new Date(item.endAt).getDate()}
                -
                {new Date(item.endAt).toLocaleString('default', { month: 'long' }).substring(0, 4)}
              </td>
              <td style={{ textAlign: "center" }} colSpan={3}>{item.circuit}</td>
              <td style={{ textAlign: "center" }} colSpan={2}>{item.clientRef}</td>
              <td style={{ textAlign: "center" }} colSpan={2}>{item.client}</td>
              <td style={{ textAlign: "center" }}>{item.paxNumber}</td>
              <td style={{ textAlign: "center" }}>{item.category === "L" ? "5 ⭐ L" : item.category === "A" ? "4 ⭐ A" : "4 ⭐ B"}</td>
              <td style={{ textAlign: "center" }} colSpan={3}>{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Filters;
