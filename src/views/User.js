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
import countries from "../assets/data/countries.json";
import image_place_holder_male from "../assets/img/image_place_holder_male.jpeg";
import image_place_holder_female from "../assets/img/image_place_holder_female.jpeg";

function User() {
  const [newClient, setNewClient] = useState({
    folderNumber: "32893",
    firstName: "Jhon",
    lastName: "Doe",
    emailAddress: "jhon.doe@gmail.com",
    phoneNumber: "+33 30299320239",
    sexe: "homme",
    nationality: "",
    memo: "Cette personne a des besoins particuliers..."
  });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
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
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Nouveau dossier</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>Dossier N°</label>
                        <Input
                          defaultValue=""
                          value={newClient.folderNumber}
                          placeholder="Dossier N°"
                          id="firstname"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, folderNumber: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <Autocomplete
                          disablePortal
                          id="Nationality"
                          options={countries}
                          sx={{ width: "auto" }}
                          inputValue={newClient.nationality}
                          renderInput={(params) => <TextField {...params} label="Nationnalité" />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, nationality: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label>Ref client</label>
                        <Input
                          defaultValue=""
                          value={newClient.refClient}
                          placeholder="Ref client"
                          id="refClient"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, refClient: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="" md="2">
                      <FormGroup>
                        <label>Dossier N°</label>
                        <Input
                          defaultValue=""
                          value={newClient.folderNumber}
                          placeholder="Dossier N°"
                          id="firstname"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, folderNumber: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="2">
                      <FormGroup>
                        <label>Nom</label>
                        <Input
                          defaultValue="Jhon"
                          value={newClient.firstName}
                          placeholder="Nom"
                          id="firstname"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, firstName: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="2">
                      <FormGroup>
                        <label>Prénom</label>
                        <Input
                          defaultValue="Doe"
                          placeholder="Prénom"
                          value={newClient.lastName}
                          id="lastname"
                          type="text"
                          onChange={(event) => { setNewClient({ ...newClient, lastName: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label htmlFor="email">
                          Adrress Mail
                        </label>
                        <Input
                          placeholder="@example.com"
                          id="email"
                          value={newClient.emailAddress}
                          type="email"
                          defaultValue="jhon.doe@gmail.com"
                          onChange={(event) => { setNewClient({ ...newClient, emailAddress: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="" md="4">
                      <FormGroup>
                        <label htmlFor="email">
                          Numéro De Déléphone
                        </label>
                        <Input
                          id="phonenumber"
                          value={newClient.phoneNumber}
                          type="text"
                          defaultValue="+33 30299320239"
                          onChange={(event) => { setNewClient({ ...newClient, phoneNumber: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Paris, France"
                          placeholder="Adrress"
                          type="text"
                          onChange={(event) => {
                            setNewClient({
                              ...newClient,
                              address: event.target.value
                            })
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <Autocomplete
                          disablePortal
                          id="Nationality"
                          options={countries}
                          sx={{ width: "auto" }}
                          inputValue={newClient.nationality}
                          renderInput={(params) => <TextField {...params} label="Nationnalité" />}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, nationality: newInputValue })
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          defaultValue={"Homme"}
                          inputValue={newClient.sexe}
                          options={[{ label: "Homme", value: "Homme" }, { label: "Femme", value: "Femme" }]}
                          sx={{ width: "auto" }}
                          onInputChange={(event, newInputValue) => {
                            setNewClient({ ...newClient, sexe: newInputValue })
                          }}
                          renderInput={(params) => <TextField {...params} label="Sexe" />}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Memo</label>
                        <Input
                          type="textarea"
                          value={newClient.memo}
                          onChange={(event) => { setNewClient({ ...newClient, memo: event.target.value }) }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => {
                          console.log("hello wordl")
                        }}
                      >
                        Ajouter
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

export default User;
