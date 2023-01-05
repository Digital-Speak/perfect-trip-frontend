import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableInput from "../Inputs/EditableInput"
import { getCities } from 'api/city';
import { addCityApi } from 'api/city';
import { editCityApi } from 'api/city';
import { deleteCityApi } from 'api/city';

function CityTable() {

  const { t } = useTranslation();
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState('New city');

  const loadData = async () => {
    const data = await getCities();
    console.log(data)
    if (data?.success) {
      setCities(data?.cities);
    }
  }

  const handleAdd = async (addCity) => {
    if (addCity && addCity !== "") {
      const data = await addCityApi({name:addCity});
      if (data?.success) {
        setNewCity("New city");
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

  const handleDelete = async (deleteCity) => {
    if (deleteCity) {
      const data = await deleteCityApi({ id: deleteCity });
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
            <CardTitle tag="h4">{t("Cities")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <thead className="text-primary">
                <tr>
                  <th>{t("City-name")}</th>
                  <th>{t("Added-at")}</th>
                  <th>{t("updated-at")}</th>
                  <th>{t("delete")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  cities?.length !== 0 &&
                  cities.map((city) => (
                    <tr>
                      <td><EditableInput text={city?.name} onTextChange={(text) => {
                        console.log(text, "cc ", city?.name)
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
                          handleDelete(city?.id);
                        }} type="button" className='text-danger' >
                          <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                          Delete
                        </div>
                      </td>
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
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default CityTable;