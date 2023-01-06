import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableInput from "../Inputs/EditableInput"
import { editAgencyApi } from 'api/agency';
import { getAdmins } from 'api/auth';
import { deleteAdminApi } from 'api/auth';
import { addSubAdminApi } from 'api/auth';

function AdminsTable() {

  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: "Sub-admin name",
    email: "Sub-admin email"
  });

  const loadData = async () => {
    const data = await getAdmins();
    console.log(data)
    if (data?.success) {
      setAdmins(data?.users);
    }
  }

  const handleAdd = async () => {
      const data = await addSubAdminApi({
        email:newAdmin?.email,
        name: newAdmin?.name,
        password: '123456',
        is_admin: false
      });
      if (data?.success) {
        setNewAdmin({
          name: "Sub-admin name",
          email: "Sub-admin email"
        });
        loadData();
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

  const handleDelete = async (deleteAdminId) => {
    if (deleteAdminId) {
      const data = await deleteAdminApi({ id: deleteAdminId });
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
            <CardTitle tag="h4">{t("Admins")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <thead className="text-primary">
                <tr>
                  <th>{t("sub-admins-name")}</th>
                  <th>{t("email")}</th>
                  <th>{t("created-at")}</th>
                  <th>{t("updated-at")}</th>
                  <th>{t("delete")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  admins?.length !== 0 ?
                  admins.map((admin) => (
                    <tr>
                      <td><EditableInput text={admin?.name} onTextChange={(text) => {
                        if (text !== admin?.name) {
                          handleEdit({
                            id: admin?.id,
                            name: text
                          })
                        }
                      }} /></td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{admin?.email}</td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{admin?.updated_at}</td>
                      <td style={{ backgroundColor: "	#F0F0F0" }}>{admin?.updated_at}</td>
                      <td>
                        <div onDoubleClick={() => { 
                          handleDelete(admin?.id);
                        }} type="button" className='text-danger' >
                          <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                          Delete
                        </div>
                      </td>
                    </tr>
                  )):(
                    <div>
                      You have no sub admins
                    </div>
                  )
                }
                <tr ><td></td></tr>
                <tr style={{ marginTop: "30px" }}>
                  <td><EditableInput style={newAdmin?.name==="Sub-admin name" ? {color: "#C0C0C0"} :{}} text={newAdmin?.name} onTextChange={(text) => {
                    setNewAdmin({
                      ...newAdmin,
                      name: text
                    });
                   }} /></td>
                      <td><EditableInput style={newAdmin?.email==="Sub-admin email" ? {color: "#C0C0C0"} :{}} text={newAdmin?.email} onTextChange={(text) => {
                    setNewAdmin({
                      ...newAdmin,
                      email: text
                    });
                   }} /></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td style={{ backgroundColor: "	#F0F0F0" }}></td>
                  <td>
                    <div onClick={() => {
                      handleAdd()
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

export default AdminsTable;