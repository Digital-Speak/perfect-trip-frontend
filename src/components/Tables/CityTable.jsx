import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import EditableInput from "../Inputs/EditableInput";
import { getCities } from 'api/city';
import { addCityApi } from 'api/city';
import { editCityApi } from 'api/city';
import { deleteCityApi } from 'api/city';

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
      const data = await addCityApi({name:addCity});
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
      <Col >
      <div>
                {/* <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/> */}
                {/* <table className='d-none' id="table-to-xls">
              <thead className="text-primary">
              <tr></tr>
              <tr></tr>
              <tr></tr>
              <tr></tr>
              <tr><td></td><td></td><td></td><td></td><td></td><td colSpan={5} style={{color:"red",fontSize:30,fontWeight:"bold"}} >Cities</td><td></td></tr>
                <tr>
                  <th>{t("Save")}</th>
                  <th>{t("Added-at")}</th>
                  <th>{t("updated-at")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  cities?.length !== 0 &&
                  cities.map((city) => (
                    <tr>
                      <td>{city?.name}</td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{city?.created_at}</td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{city?.updated_at}</td>
                    </tr>
                  ))
                }
                <tr ><td></td></tr>
                <tr style={{ marginTop: "30px" }}>
                  <td><EditableInput style={newCity==="New city" ? {color: "#C0C0C0"} :{}} text={newCity} onTextChange={(text) => {
                    setNewCity(text);
                   }} /></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td>
                    <div onClick={() => {
                      handleAdd(newCity)
                     }} type="button" className='text-info' >
                      <i className="fa fa-solid fa-plus mr-2 text-info" />
                      Add
                    </div>
                  </td>
                </tr>
                <tr ><td></td></tr>
              </tbody>
            </table> */}

            </div>
      </Col>
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
            <Table responsive style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <thead className="text-primary">
                <tr>
                  <th>{t("name")}</th>
                  <th>{t("Added-at")}</th>
                  <th>{t("Updated-at")}</th>
                  <th>{t("satatus")}</th>
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
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{city?.created_at}</td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{city?.updated_at}</td>
                      <td>
                        <div onClick={() => { 
                           setDeleteCityId(city?.id);
                        }} data-toggle="modal" data-target={deleteCityId === city?.id && "#exampleModal"} type="button" className='text-danger' >
                          <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                          Supprimer
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
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete city</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this city?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={handleDelete} data-dismiss="modal" type="button" class="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}

export default CityTable;