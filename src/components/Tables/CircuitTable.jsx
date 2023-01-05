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

function CircuitTable() {
  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [newCircuit, setNewCircuit] = useState({
    name: "New Circuit",
  });

  const loadData = async () => {
    const data = await getHotels();
    const _data = await getCities();
    // const dataCircuits = await getCiruitsApi();
    setCities(_data?.cities);
    setNewCircuit({
      name: "New Circuit",
    });
    if (data?.success) {
      setHotels(data?.hotels);
    }
  };

  const handleAdd = async () => {
      // const data = await addCircuitApi(newCircuit);
      // if (data?.success) {
      //   loadData();
      // }  
  };

  // const handleEdit = async (editCircuit) => {
  //     const data = await editCircuitApi(editCircuit);
  //     if (data?.success) {
  //       loadData();
  //     }   
  // };

  const handleDelete = async (deleteCircuit) => {
    // if (deleteCircuit) {
    //   const data = await deleteCircuitApi({ id: deleteCircuit });
    //   if (data?.success) {
    //     loadData();
    //   }
    // }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Circuits")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table
              responsive
              style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}
            >
              <thead className="text-primary">
                <tr>
                  <th>{t("circuit-name")}</th>
                  <th>{t("number-of-stars")}</th>
                  <th>{t("hotel-location")}</th>
                  <th>{t("Added-at")}</th>
                  <th>{t("updated-at")}</th>
                  <th>{t("delete")}</th>
                </tr>
              </thead>
            
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default CircuitTable;
