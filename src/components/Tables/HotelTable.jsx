import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableInput from "../Inputs/EditableInput"
import { getHotels } from 'api/hotel';
import { addHotelApi } from 'api/hotel';
import { editHotelApi } from 'api/hotel';
import { deleteHotelApi } from 'api/hotel';
import EditableSelect from 'components/Inputs/EditableSelect';
import { getCities } from 'api/city';
import CustomEditableSelect from 'components/Inputs/CustomEditableSelect';

function HotelTable() {

  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [newHotel, setNewHotel] = useState('New hotel');

  const loadData = async () => {
    const data = await getHotels();
    const _data = await getCities();
    setCities(_data?.cities);
    console.log(data)
    if (data?.success) {
      setHotels(data?.hotels);
    }
  }

  const handleAdd = async (addHotel) => {
    if (addHotel && addHotel !== "") {
      const data = await addHotelApi({ name: addHotel });
      if (data?.success) {
        setNewHotel("New hotel");
        loadData();
      }
    }
  }

  const handleEdit = async (editHotel) => {
    if (editHotel?.name && editHotel?.name !== "") {
      const data = await editHotelApi(editHotel);
      if (data?.success) {
        loadData();
      }
    }
  }

  const handleDelete = async (deleteHotel) => {
    if (deleteHotel) {
      const data = await deleteHotelApi({ id: deleteHotel });
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
            <CardTitle tag="h4">{t("hotels")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <thead className="text-primary">
                <tr>
                  <th>{t("hotel-name")}</th>
                  <th>{t("number-of-stars")}</th>
                  <th>{t("hotel-location")}</th>
                  <th>{t("Added-at")}</th>
                  <th>{t("updated-at")}</th>
                  <th>{t("delete")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  hotels?.length !== 0 &&
                  hotels.map((hotel) => (
                    <tr>
                      <td><EditableInput text={hotel?.name} onTextChange={(text) => {
                        if (text !== hotel?.name) {
                          handleEdit({
                            id: hotel?.id,
                            name: text
                          })
                        }
                      }} /></td>
                      <td>
                        <EditableSelect
                          data={[{ label: "5L" }, { label: "4A" }, { label: "4B" }]}
                          text={hotel?.stars}
                          onTextChange={(newStars) => {
                            handleEdit({ id: hotel?.id, stars: newStars, name: hotel?.name, city_id: hotel?.city_id })
                          }}
                        /></td>
                      <td>
                        <CustomEditableSelect
                          data={cities.length ? cities : []}
                          text={hotel?.cityName ? hotel?.cityName : "Affect a city"}
                          id={hotel?.city_id}
                          cb={(name,id) => {
                            handleEdit({ id: hotel?.id, stars: hotel?.stars, name: hotel?.name, city_id: id })
                          }}
                        />
                      </td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{hotel?.created_at}</td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{hotel?.updated_at}</td>
                      <td>
                        <div onClick={() => {
                          handleDelete(hotel?.id);
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
                  <td><EditableInput style={newHotel === "New hotel" ? { color: "#C0C0C0" } : {}} text={newHotel} onTextChange={(text) => {
                    setNewHotel(text);
                  }} /></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td>
                    <div onClick={() => {
                      handleAdd(newHotel)
                    }} type="button" className='text-danger' >
                      <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
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

export default HotelTable;