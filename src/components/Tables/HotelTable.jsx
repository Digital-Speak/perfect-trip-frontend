import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
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
    setNewHotel({
      name: "New hotel",
      stars: "5L",
      city_id: _data?.cities[0].id,
      city_name: _data?.cities[0].name,
    });
    if (data?.success) {
      setHotels(data?.hotels);
    }
  };

  const handleAdd = async () => {
      const data = await addHotelApi(newHotel);
      if (data?.success) {
        loadData();
      }  
  };

  const handleEdit = async (editHotel) => {
    if (editHotel?.name && editHotel?.name !== "") {
      const data = await editHotelApi(editHotel);
      if (data?.success) {
        loadData();
      }
    }
  };

  const handleDelete = async (deleteHotel) => {
    if (deleteHotel) {
      const data = await deleteHotelApi({ id: deleteHotel });
      if (data?.success) {
        loadData();
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(newHotel);
  return (
    <Row>
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
                    <tr>
                      {/* hotel name cell */}
                      <td>
                        <EditableInput
                          text={hotel?.name}
                          cb={(text) => {
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
                          cb={(newStars) => {
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
                          cb={(name, id) => {
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
                            handleDelete(hotel?.id);
                          }}
                          type="button"
                          className="text-danger"
                        >
                          <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                          Delete
                        </div>
                      </td>
                    </tr>
                  ))}
                <tr style={{ height: "50px" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr style={{ marginTop: "30px" }}>
                  <td>
                    <EditableInput
                      style={
                        newHotel === "New hotel" ? { color: "#C0C0C0" } : {}
                      }
                      text={newHotel?.name}
                      cb={(text) => {
                        setNewHotel({
                          ...newHotel,
                          name: text,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <EditableSelect
                      data={[{ label: "5L" }, { label: "4A" }, { label: "4B" }]}
                      text={newHotel?.stars}
                      cb={(newStars) => {
                        setNewHotel({
                          ...newHotel,
                          stars: newStars,
                        });
                      }}
                    />
                  </td>
                  <td>
                    {newHotel?.city_id && (
                      <CustomEditableSelect
                        data={cities.length ? cities : []}
                        text={newHotel?.city_name}
                        id={newHotel?.city_id}
                        cb={(name, id) => {
                          console.log("z",id)
                          setNewHotel({
                            ...newHotel,
                            city_id: id
                          })
                        }}
                      />
                    )}
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <div
                      onClick={() => {
                        handleAdd();
                      }}
                      type="button"
                      className="text-info"
                    >
                      <i className="fa fa-solid fa-plus mr-2 text-info" />
                      Add
                    </div>
                  </td>
                </tr>
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
    </Row>
  );
}

export default HotelTable;
