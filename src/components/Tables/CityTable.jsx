import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableInput from "../Inputs/EditableInput";
import { getCities } from 'api/city';
import { addCityApi } from 'api/city';
import { editCityApi } from 'api/city';
import { deleteCityApi } from 'api/city';
import moment from 'moment';

function CityTable() {
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [deleteCityId, setDeleteCityId] = useState(null);
  const [newCity, setNewCity] = useState('');

  const loadData = async () => {
    const data = await getCities();
    if (data?.success) {
      setCities(data?.cities);
    }
  }

  const handleAdd = async (addCity) => {
    if (addCity && addCity !== "") {
      const data = await addCityApi({ name: addCity });
      if (data?.success) {
        setNewCity("");
        loadData();
      }
    }
  }

  const handleEdit = async (editCity) => {
    if (editCity?.name && editCity?.name !== "") {
      const data = await editCityApi(editCity);
      if (data?.success) {
        loadData();
      }
    }
  }

  const handleDelete = async () => {
    if (deleteCityId) {
      const data = await deleteCityApi({ id: deleteCityId });
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
            <CardTitle tag="h4">{t("Add-city")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="" md="4" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("City-name")}</label>
                  <Input
                    defaultValue=""
                    value={newCity}
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => {
                      setNewCity(event.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className="" md="4" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label style={{ opacity: 0 }}>.</label>
                  <Button onClick={() => {
                    handleAdd(newCity)
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
            <CardTitle tag="h4">{t("Cities")}</CardTitle>
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
                  cities?.length !== 0 &&
                  cities.map((city) => (
                    <tr>
                      <td><EditableInput text={city?.name} onTextChange={(text) => {
                        if (text !== city?.name) {
                          handleEdit({
                            id: city?.id,
                            name: text
                          })
                        }
                      }} /></td>
                      <td style={{textAlign: "center"}}>{moment(city?.created_at).format("DD-MM-YYYY HH:MM")}</td>
                      <td style={{ textAlign: "center" }}>{moment(city?.updated_at).format("DD-MM-YYYY HH:MM")}</td>
                      <td>
                        <div onClick={() => {
                          setDeleteCityId(city?.id);
                        }} data-toggle="modal" data-target={deleteCityId === city?.id && "#exampleModal"} type="button" className='text-danger' >
                          <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                          {t('Remove')}
                        </div>
                      </td>
                    </tr>
                  ))
                }
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

export default CityTable;