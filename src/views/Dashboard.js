import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import agences from "../assets/data/agences.json";
import circuits from "../assets/data/circuits.json";
import cats from "../assets/data/cats.json";
import typesHAB from "../assets/data/typesHAB.json";
import image_place_holder_male from "../assets/img/image_place_holder_male.jpeg";
import image_place_holder_female from "../assets/img/image_place_holder_female.jpeg";
import HomeTable from "../components/Tables/home-table";
import { useTranslation } from 'react-i18next'; 
function Dashboard() {
  const [newClient, setNewClient] = useState({
    folderNumber: "32893",
    refClient: "D2291",
    fullName: "Jhon Doe",
    agency: "",
    circuit: "",
    cat: "",
    typeHAB: "",
    nbrPax: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const { t } = useTranslation();
  return (
    <>
      <div className="content" style={{ "width": "90%", "justifyContent": "center", "marginLeft": "auto", "marginRight": "auto" }}>
        <Row>
          {/* <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={require("assets/img/travel-to-morocco.jpeg")} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={newClient.sexe === "Femme" ? image_place_holder_female : image_place_holder_male}
                    />
                    <h5 className="title">{newClient.firstName} {newClient.lastName}</h5>
                  </a>
                  <p className="description">{newClient.emailAddress}</p>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        Placeholder
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        Placeholder
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        Placeholder
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col> */}
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">{t("New-Folder")}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Folder-Number")}</label>
                        <Input
                          defaultValue=""
                          value={newClient.folderNumber}
                          style={{ "height": "55px" }}
                          id="firstname"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, folderNumber: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Agency")}</label>
                        <Autocomplete
                          disablePortal
                          options={agences}
                          sx={{ width: "auto" }}
                          inputValue={newClient.agency}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, agency: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Client-Ref")}</label>
                        <Input
                          defaultValue=""
                          value={newClient.refClient}
                          id="refClient"
                          style={{ "height": "55px" }}
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, refClient: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Circuit")}</label>
                        <Autocomplete
                          disablePortal
                          id="circuit"
                          options={circuits}
                          sx={{ width: "auto" }}
                          inputValue={newClient.circuit}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, circuit: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Cat")}</label>
                        <Autocomplete
                          disablePortal
                          id="cat"
                          options={cats}
                          sx={{ width: "auto" }}
                          inputValue={newClient.cat}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, cat: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("FullName")}</label>
                        <Input
                          value={newClient.fullName}
                          style={{ "height": "55px" }}
                          id="fullName"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, fullName: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>{t("Type-HB")}</label>
                        <Autocomplete
                          disablePortal
                          id="typeHAB"
                          options={typesHAB}
                          sx={{ width: "auto" }}
                          inputValue={newClient.typeHAB}
                          renderInput={(params) => <TextField {...params} label={t("Select")} />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, typeHAB: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <label> {t("Period")}</label>
                      <Row>
                        <Col className="" md="6">
                          <FormGroup>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label={t("From")}
                                value={newClient.startDate}
                                onChange={(newValue) => {
                                  setNewClient({ ...newClient, startDate: newValue })
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </FormGroup>
                        </Col>
                        <Col className="" md="6">
                          <FormGroup>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label={t("To")}
                                value={newClient.endDate}
                                onChange={(newValue) => {
                                  setNewClient({ ...newClient, startDate: newValue })
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label> {t("Pax-Number")}</label>
                        <Input
                          value={newClient.nbrPax}
                          style={{ "height": "55px" }}
                          id="nbrPax"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, nbrPax: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <HomeTable t={t} data={[

                      ]}/>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto d-flex">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => {
                          
                        }}
                      >
                        {t("Save")}
                      </Button>
                      <Button
                        className="btn-round"
                        color="danger"
                        onClick={() => {

                        }}
                      >
                        {t("Cancel")}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
