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


function Settings() {
  const { t } = useTranslation();
  const [sector, setSector] = useState("hotel");

  const loadCard = () => {
    switch (sector) {
      case "city":
        return <CityTable/>
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
                  <Col className="" md="4">
                      <button onClick={() => { setSector("hotel") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector === 'hotel' && 'active'}`}>Hotel</button>
                    </Col>
                    <Col className="" md="4">
                      <button onClick={() => { setSector("agency") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector === 'agency' && 'active'}`}>Agency</button>
                    </Col>
                    <Col className="" md="4">
                      <button onClick={() => { setSector("city") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector === 'city' && 'active'}`}>City</button>
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

export default Settings;
