import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableInput from "../Inputs/EditableInput"
import { getAgencies } from 'api/agency';
import { editAgencyApi, deleteAgencyApi, addAgencyApi } from 'api/agency';
import moment from 'moment';

function AgencyTable() {

  const { t } = useTranslation();
  const [agencies, setAgencies] = useState([]);
  const [deleteAgencyId, setDeleteAgencyId] = useState(null);
  const [newAgency, setNewAgency] = useState('');

  const loadData = async () => {
    const data = await getAgencies();
    if (data?.success) {
      setAgencies(data?.agencies);
    }
  }

  const handleAdd = async (addAgency) => {
    if (addAgency && addAgency !== "") {
      const data = await addAgencyApi({ name: addAgency });
      if (data?.success) {
        setNewAgency("");
        loadData();
      }
    }
  }
  const handleEdit = async (editAgency) => {
    if (editAgency?.name && editAgency?.name !== "") {
      const data = await editAgencyApi(editAgency);
      if (data?.success) {
        loadData();
      }
    }
  }

  const handleDelete = async () => {
    if (deleteAgencyId) {
      const data = await deleteAgencyApi({ id: deleteAgencyId });
      if (data?.success) {
        loadData();
      }
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Add-agency")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="" md="4" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("Agency-name")}</label>
                  <Input
                    defaultValue=""
                    value={newAgency}
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => {
                      setNewAgency(event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className="" md="4" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label style={{ opacity: 0 }}>.</label>
                  <Button onClick={() => {
                    handleAdd(newAgency)
                  }} className='btn btn-block bg-info text-white border-0' style={{ "height": "53px" }}>{t("Add")}</Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Agencies")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table striped responsive style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <thead className="text-primary">
                <tr>
                  <th>{t("name")}</th>
                  <th style={{ textAlign: "center" }}>{t("Added-at")}</th>
                  <th style={{ textAlign: "center" }}>{t("Updated-at")}</th>
                  <th>{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  agencies?.length !== 0 &&
                  agencies.map((agency) => (
                    <tr>
                      <td><EditableInput text={agency?.name} onTextChange={(text) => {
                        if (text !== agency?.name) {
                          handleEdit({
                            id: agency?.id,
                            name: text
                          })
                        }
                      }} /></td>
                      <td style={{ textAlign: "center" }}>{moment(agency?.created_at).format("DD-MM-YYYY HH:MM")}</td>
                      <td style={{ textAlign: "center" }}>{moment(agency?.updated_at).format("DD-MM-YYYY HH:MM")}</td>
                      <td>
                        <div onClick={() => {
                          setDeleteAgencyId(agency?.id);
                        }} data-toggle="modal" data-target={deleteAgencyId === agency?.id && "#exampleModal"} type="button" className='text-danger' >
                          <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                          {t("Remove")}
                        </div>
                      </td>
                    </tr>
                  ))
                }
                <tr ><td></td></tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{t('Delete city')}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {t('Are you sure you want to delete?')}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{t('Close')}</button>
              <button onClick={handleDelete} data-dismiss="modal" type="button" class="btn btn-primary">{t('Remove')}</button>
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

export default AgencyTable;