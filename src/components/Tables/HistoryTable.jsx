import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Row, Table } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import EditableInput from "../Inputs/EditableInput"
import { editAgencyApi } from 'api/agency';
import { getAdmins } from 'api/auth';
import { deleteAdminApi } from 'api/auth';
import { addSubAdminApi } from 'api/auth';

function HistoryTable() {

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

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Row >
      <Col md="12">
        <Card style={{minHeight:"70vh"}}>
          <CardHeader>
            <CardTitle tag="h4">{t("History")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
              <thead className="text-primary">
                <tr>
                  <th>{t("Time")}</th>
                  <th>{t("User")}</th>
                  <th>{t("action")}</th>
                  <th>{t("location")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  admins?.length !== 0 ?
                    admins.map((admin) => (
                      <tr>
                        <td style={{ backgroundColor: "	#F0F0F0" }}>{"-"}</td>
                        <td style={{ backgroundColor: "	#F0F0F0" }}>{"-"}</td>
                        <td style={{ backgroundColor: "	#F0F0F0" }}>{"-"}</td>
                        <td style={{ backgroundColor: "	#F0F0F0" }}>{"-"}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5}>
                          Empty history
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
    </Row>
  )
}

export default HistoryTable;