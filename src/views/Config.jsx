import React, { useState } from "react";
import {
  Card,
  CardBody,
  Form,
  Row,
  Col
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import AgencyTable from "components/Tables/AgencyTable";
import CityTable from "components/Tables/CityTable";
import HotelTable from "components/Tables/HotelTable";
import CircuitTable from "components/Tables/CircuitTable";


function Config() {
  const { t } = useTranslation();
  const [sector, setSector] = useState("hotel");

  const loadCard = () => {
    switch (sector) {
      case "city":
        return <CityTable />
      case "agency":
        return <AgencyTable />
      case "hotel":
        return <HotelTable />
      case "circuit":
        return <CircuitTable />
      default:
        break;
    }
  }

  return (
    <>
      <div className="content" style={{ "width": "100%", "justifyContent": "center", "marginLeft": "auto", "marginRight": "auto" }}>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="" md="3">
                      <button onClick={() => { setSector("hotel") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector === 'hotel' && 'active'}`}>{t("Hotel")}</button>
                    </Col>
                    <Col className="" md="3">
                      <button onClick={() => { setSector("agency") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector === 'agency' && 'active'}`}>{t("Agency")}</button>
                    </Col>
                    <Col className="" md="3">
                      <button onClick={() => { setSector("city") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector === 'city' && 'active'}`}>{t("City")}</button>
                    </Col>
                    <Col className="" md="3">
                      <button onClick={() => { setSector("circuit") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector === 'circuit' && 'active'}`}>{t("Circuit")}</button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            {loadCard()}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Config;
