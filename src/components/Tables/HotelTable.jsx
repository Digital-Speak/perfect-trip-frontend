import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import EditableInput from "../Inputs/EditableInput";
import { getHotels } from "api/hotel";
import { addHotelApi } from "api/hotel";
import { editHotelApi } from "api/hotel";
import { deleteHotelApi } from "api/hotel";
import EditableSelect from "components/Inputs/EditableSelect";
import { getCities } from "api/city";
import CustomEditableSelect from "components/Inputs/CustomEditableSelect";

function HotelTable() {
  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteHotelId, setDeleteHotelId] = useState(null);
  const [cities, setCities] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: "New hotel",
    stars: "5L",
    city_id: null,
    city_name: "*",
  });

  const loadData = async () => {
    const data = await getHotels();
    const _data = await getCities();
    setCities(_data?.cities);
    if (data?.success) {
      setHotels(data?.hotels);
      setNewHotel({
        name: "New hotel",
        ...newHotel
      });
    }
    setIsLoading(false);
  };

  const handleAdd = async () => {
    const data = await addHotelApi(newHotel);
    if (data?.success) {
      setIsLoading(true);
    }
  };

  const handleEdit = async (editHotel) => {
    if (editHotel?.name && editHotel?.name !== "") {
      const data = await editHotelApi(editHotel);
      if (data?.success) {
        setIsLoading(true)
      }
    }
  };

  const handleDelete = async () => {
    const data = await deleteHotelApi({ id: deleteHotelId });
    if (data?.success) {
      setIsLoading(true)
    }
  };

  useEffect(() => {
    if (isLoading)
      loadData();
  }, [isLoading]);

  useEffect(() => {
    if (cities.length !== 0) {
      setNewHotel({
        name: "New hotel",
        stars: "5L",
        city_id: cities[0]?.id,
        city_name: cities[0]?.name,
      });
    }
  }, [cities.length])

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Add-hotel")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("hotel-name")}</label>
                  <Input
                    defaultValue=""
                    value={newHotel?.name}
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => {
                      setNewHotel({
                        ...newHotel,
                        name: event.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("hotel-number-of-stars")}</label>
                  <select
                    className="form-control"
                    style={{ height: "55px" }}
                    onChange={(event) => {
                      setNewHotel({
                        ...newHotel,
                        stars: event.target.value,
                      });
                    }} name="" id="">
                    <option value="5L">5L</option>
                    <option value="4A">4A</option>
                    <option value="4B">4B</option>
                  </select>
                </FormGroup>
              </Col>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label>{t("location-city")}</label>
                  <select
                    className="form-control"
                    style={{ height: "55px" }}
                    onChange={(event) => {
                      setNewHotel({
                        ...newHotel,
                        city_id: event.target.value,
                      });
                    }} name="" id="">
                    {cities?.length !== 0 && cities?.map((city) =>
                    (
                      <option value={city?.id}>{city?.name}</option>
                    ))
                    }
                  </select>
                </FormGroup>
              </Col>
              <Col className="" md="3" style={{ height: "120px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <FormGroup>
                  <label style={{ opacity: 0 }}>.</label>
                  <Button onClick={() => {
                    handleAdd()
                  }} className='btn btn-block bg-info text-white border-0' style={{ "height": "53px" }}>Add</Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("hotels")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table
              responsive
              style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}
            >
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
                {hotels?.length !== 0 &&
                  hotels.map((hotel) => (
                    <tr key={hotel?.id}>
                      {/* hotel name cell */}
                      <td>
                        <EditableInput
                          text={hotel?.name}
                          onTextChange={(text) => {
                            if (text !== hotel?.name) {
                              handleEdit({
                                id: hotel?.id,
                                name: text,
                              });
                            }
                          }}
                        />
                      </td>
                      {/* hotel number of stars cell */}
                      <td>
                        <EditableSelect
                          data={[
                            { label: "5L" },
                            { label: "4A" },
                            { label: "4B" },
                          ]}
                          text={hotel?.stars || "-"}
                          onTextChange={(newStars) => {
                            handleEdit({
                              id: hotel?.id,
                              stars: newStars,
                              name: hotel?.name,
                              city_id: hotel?.city_id,
                            });
                          }}
                        />
                      </td>
                      <td>
                        <CustomEditableSelect
                          data={cities.length ? cities : []}
                          text={
                            hotel?.cityName ? hotel?.cityName : "Affect a city"
                          }
                          id={hotel?.city_id}
                          onTextChange={(name, id) => {
                            handleEdit({
                              id: hotel?.id,
                              stars: hotel?.stars,
                              name: hotel?.name,
                              city_id: id,
                            });
                          }}
                        />
                      </td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>
                        {hotel?.created_at}
                      </td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>
                        {hotel?.updated_at}
                      </td>
                      <td>
                        <div
                          onClick={() => {
                            setDeleteHotelId(hotel?.id);
                          }}
                          data-toggle="modal" data-target={deleteHotelId === hotel?.id && "#exampleModal"}
                          type="button"
                          className="text-danger"
                        >
                          <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete hotel</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this hotel?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={handleDelete} data-dismiss="modal" type="button" class="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
}

export default HotelTable;
