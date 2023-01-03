import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableSelect from "../Inputs/EditableSelect";
import EditableInput from "../Inputs/EditableInput"
import { getAgencies } from 'api/agency';
import { editAgencyApi, deleteAgencyApi, addAgencyApi } from 'api/agency';

function AgencyTable() {

  const { t } = useTranslation();
  const [agencies, setAgencies] = useState([]);
  const [newAgency, setNewAgency] = useState('New agency');

  const loadData = async () => {
    const data = await getAgencies();
    console.log(data)
    if (data?.success) {
      setAgencies(data?.agencies);
    }
  }

  const handleAdd = async (addAgency) => {
    if (addAgency && addAgency !== "") {
      const data = await addAgencyApi({name:addAgency});
      if (data?.success) {
        setNewAgency("New agency");
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

  const handleDelete = async (deleteAgency) => {
    if (deleteAgency) {
      const data = await deleteAgencyApi({ id: deleteAgency });
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
            <CardTitle tag="h4">{t("Agencies")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <thead className="text-primary">
                <tr>
                  <th>{t("Agency-name")}</th>
                  <th>{t("Added-at")}</th>
                  <th>{t("updated-at")}</th>
                  <th>{t("delete")}</th>
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
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{agency?.created_at}</td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{agency?.updated_at}</td>
                      <td>
                        <div onClick={() => { 
                          handleDelete(agency?.id);
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
                  <td><EditableInput style={newAgency==="New agency" ? {color: "#C0C0C0"} :{}} text={newAgency} onTextChange={(text) => {
                    setNewAgency(text);
                   }} /></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td>
                    <div onClick={() => {
                      handleAdd(newAgency)
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

export default AgencyTable;