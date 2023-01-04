import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
  Form
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { getAgencies } from "api/agency";
import { editAgencyApi } from "api/agency";
import { deleteAgencyApi } from "api/agency";
import { addAgencyApi } from "api/agency";


function AgencySettingsCard({ action }) {

  const { t } = useTranslation();
  const [error, setError] = useState({
    add: null,
    edit: null,
    delete: null
  });
  const [agencies, setAgencies] = useState([]);
  const [addAgency, setAddAgency] = useState('');
  const [deleteAgency, setDeleteAgency] = useState(null);
  const [editAgency, setEditAgency] = useState({
    id: null,
    name: null,
  });


  const resetStates = () => {
    setError({
      add: null,
      edit: null,
      delete: null
    });
    setEditAgency({
      id: null,
      name: "",
    });
    setAddAgency('');
  }
  const loadData = async () => {
    const data = await getAgencies();
    console.log(data)
    if (data?.success) {
      setEditAgency({
        name: "",
        id: data?.agencies[0]?.id
      });
      setDeleteAgency(data?.agencies[0]?.id);
      setAgencies(data?.agencies);
    }
  }

  const handleEdit = async () => {
    if (editAgency?.name && editAgency?.name !== "") {
      const data = await editAgencyApi(editAgency);
      if (data?.success) {
        alert("Agency updated successfully.");
        resetStates();
        loadData();
      }
    } else {
      setError({
        ...error,
        edit: "Please provide a correct Agency name."
      })
    }
  }

  const handleDelete = async () => {
    if (deleteAgency) {
      const data = await deleteAgencyApi({id: deleteAgency});
      if (data?.success) {
        alert("Agency deleted successfully.");
        resetStates();
        loadData();
      }
    } else {
      setError({
        ...error,
        delete: "An error occured"
      })
    }
  }

  const handleAdd = async () => {
    if (addAgency && addAgency !== "") {
      const data = await addAgencyApi({name:addAgency});
      if (data?.success) {
        alert("Agency added successfully.");
        resetStates();
        loadData();
      }else{
        setError({
          ...error,
          add: "Please provide a correct agency name."
        })
      }
    } else {
      setError({
        ...error,
        add: "Please provide a correct agency name."
      })
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      {
        action === "add" ?
          <Card >
            <CardHeader>
              <CardTitle tag="h5">{t("add-agency")}</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="" md="8">
                    <FormGroup>
                      <label>{t("agency-name")}</label>
                      <Input
                        value={addAgency}
                        id="refClient"
                        style={{ "height": "55px" }}
                        type="text"
                        onChange={(event) => { setAddAgency(event.target.value) }}
                      />
                      {error?.add && <label>{error?.add}</label>}

                    </FormGroup>
                  </Col>
                  <Col className="" md="4">
                    <FormGroup>
                      <label></label>
                      <Button
                        className="btn btn-block"
                        color="primary"

                        onClick={() => {
                          handleAdd()
                        }}
                      >
                        {t("Save")}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>

                </Row>
              </Form>
            </CardBody>
          </Card> :
          action === "edit" ?
            <Card >
              <CardHeader>
                <CardTitle tag="h5">{t("edit-agency-name")}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="6">
                      <FormGroup>
                        <label>{t("choose-agency")}</label>
                        <select
                          className="form-control form-select"
                          style={{ "height": "55px" }}
                          onChange={(event) => {
                            setEditAgency({
                              ...editAgency,
                              id: event.target.value
                            });
                          }}
                          aria-label="Default select example">
                          {agencies?.length !== 0 && agencies.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                        </select>
                        {error?.edit && <label className="text-danger">{error?.edit}</label>}

                      </FormGroup>
                    </Col>
                    <Col className="" md="6">
                      <FormGroup>
                        <label>{t("change-agency-name")}</label>
                        {console.log(editAgency.name)}
                        <Input
                          defaultValue={editAgency.name}
                          value={editAgency.name}
                          id="refClienst"
                          style={{ "height": "55px" }}
                          type="text"
                          onChange={(event) => {
                            setEditAgency({
                              ...editAgency,
                              name: event.target.value
                            })
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto d-flex">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={() => {
                          handleEdit()
                        }}
                      >
                        {t("edit")}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card> :
            <Card >
            <CardHeader>
              <CardTitle tag="h5">{t("delete-agency")}</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="" md="8">
                    <FormGroup>
                      <label>{t("choose-agency")}</label>
                      <select
                        className="form-control form-select"
                        style={{ "height": "55px" }}
                        onChange={(event) => {
                          setDeleteAgency(event.target.value);
                        }}
                        aria-label="Default select example">
                        {agencies?.length !== 0 && agencies.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
                      </select>
                      {error?.delete && <label className="text-danger">{error?.delete}</label>}

                    </FormGroup>
                  </Col>
                  <Col className="" md="4">
                    <FormGroup>
                      <label></label>
                      <Button
                        className="btn btn-block"
                        color="danger"
                        onClick={() => {
                          handleDelete()
                        }}
                      >
                        {t("delete")}
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
      }

    </div>

  )
}

export default AgencySettingsCard;