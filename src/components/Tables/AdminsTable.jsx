import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableInput from "../Inputs/EditableInput"
import { editAgencyApi } from 'api/agency';
import { getAdmins } from 'api/auth';
import { deleteAdminApi } from 'api/auth';
import { addSubAdminApi } from 'api/auth';

function AdminsTable() {

  const { t } = useTranslation();
  const [admins, setAdmins] = useState([]);
  const [deleteSubAdminId, setDeleteSubAdminId] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    name: "Sub-admin name",
    email: "Sub-admin email"
  });

  const loadData = async () => {
    const data = await getAdmins();
    setAdmins(data?.users || []);
  }

  const handleAdd = async () => {
    const data = await addSubAdminApi({
      email: newAdmin?.email,
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

  const handleDelete = async () => {
    if (deleteSubAdminId) {
      const data = await deleteAdminApi({ id: deleteSubAdminId });
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
            <CardTitle tag="h4">{t("Add sub-admin")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="" md="4" style={{height:"120px", display:"flex",flexDirection:"column", justifyContent:"center"}}>
                <FormGroup>
                  <label>{t("sub-admin-name")}</label>
                  <Input
                    defaultValue=""
                    value={newAdmin?.name}
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => {
                        setNewAdmin({
                          ...newAdmin,
                          name: event.target.value
                        });
                      }}
                  />
                </FormGroup>
              </Col>
              <Col className="" md="4" style={{height:"120px", display:"flex",flexDirection:"column", justifyContent:"center"}}>
                <FormGroup>
                  <label>{t("sub-admin-email")}</label>
                  <Input
                    defaultValue=""
                    value={newAdmin?.email}
                    id="refClient"
                    style={{ "height": "55px" }}
                    type="text"
                    onChange={(event) => {
                        setNewAdmin({
                          ...newAdmin,
                          email: event.target.value
                        });
                      }}
                  />
                </FormGroup>
              </Col>
              <Col className="" md="4" style={{height:"120px", display:"flex",flexDirection:"column", justifyContent:"center"}}>
                <FormGroup>
                <label style={{opacity:0}}>.</label>
                <Button  onClick={handleAdd} className='btn btn-block bg-info text-white border-0'  style={{ "height": "50px" }}>Add</Button>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">{t("Sub-admins")}</CardTitle>
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
                          <div onClick={() => {
                            setDeleteSubAdminId(admin?.id);
                          }} data-toggle="modal" data-target={deleteSubAdminId === admin?.id && "#exampleModal"} type="button" className='text-danger' >
                            <i className="fa fa-solid fa-trash-o mr-2 text-danger" />
                            Delete
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5}>
                          You have no sub admins
                        </td>
                      </tr>
                    )
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
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this sub-admin?
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

export default AdminsTable;