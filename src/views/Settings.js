import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { getCircuit, postData } from "../api/dashboard";
import AdminSettingsCard from "components/cards/AdminSettingsCard";
import CitySettingsCard from "components/cards/CitySettingsCard";
import AgencySettingsCard from "components/cards/AgencySettingsCard";
import HotelSettingsCard from "components/cards/HotelSettingsCard";


function Settings() {
  const [circuitsServerData, setCircuitsServerData] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [sector, setSector] = useState("admin");
  const [action, setAction] = useState("add");





  const [newClient, setNewClient] = useState({
    folderNumber: Date.now(),
    refClient: "D2291",
    fullName: "Jhon Doe",
    agency: "",
    circuit: "",
    cat: "L",
    typeHAB: "",
    nbrPax: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const loadData = async () => {
    const payload = await getCircuit();
    if (!payload.success) return;
    setCircuitsServerData(payload.circuits);
    const newData = [];
    payload.circuits.forEach((item) => {
      newData.push({
        label: item.name
      })
    });

    setCircuits(newData);
  }

  const fetchHotels = async (circ, cat) => {
    const payload = await postData("hotel/circuit_city_hotels", "POST", {
      id: circ,
      cat
    });

    if (!payload.success) return;
    setHotels(payload.hotels)
  }

  useEffect(() => {
    if (circuits.length === 0) loadData();
  }, [circuits]);


  const loadCard = () => {
    switch (sector) {
      case "admin":
        return <AdminSettingsCard action={action} />
      case "city":
        return <CitySettingsCard action={action} />
        case "agency":
          return <AgencySettingsCard action={action} />
             case "hotel":
          return <HotelSettingsCard action={action} />
      default:
        break;
    }
}


useEffect(() => {
  if (newClient.circuit !== "" && newClient.cat !== "") {
    fetchHotels(circuitsServerData.filter((item) => item.name === newClient.circuit)[0].id, newClient.cat);

  }
}, [newClient.circuit, newClient.cat]);

const { t } = useTranslation();
return (
  <>
    <div className="content" style={{ "width": "100%", "justifyContent": "center", "marginLeft": "auto", "marginRight": "auto" }}>
      <Row>
        <Col md="2">
          <Card className="card-user">
            <CardBody>
              <Form>
                <Row>
                  <Col className="" md="12">
                    <button onClick={()=>{setSector("admin")}} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector==='admin' && 'active'}`}>Admin</button>
                  </Col>
                  <Col className="" md="12">
                    <button onClick={()=>{setSector("agency")}} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector==='agency' && 'active'}`}>Agency</button>
                  </Col>
                  <Col className="" md="12">
                    <button onClick={()=>{setSector("city")}} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector==='city' && 'active'}`}>City</button>
                  </Col>
                  <Col className="" md="12">
                    <button onClick={()=>{setSector("hotel")}} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector==='hotel' && 'active'}`}>Hotel</button>
                  </Col>
                  <Col className="" md="12">
                    <button onClick={()=>{setSector("circuit")}} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${sector==='circuit' && 'active'}`}>Circuit</button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md="9">
          <Card style={{}}>
            <CardBody>
              <Form>
                <Row>
                  <Col className="" sm="12" md="4">
                    <button onClick={() => { setAction("add") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${action==='add' && 'active'}`}>
                      <i className="fa fa-solid fa-plus-square-o mr-2" />
                      Add
                    </button>
                  </Col>
                  <Col className="" sm="12" md="4">
                    <button onClick={() => { setAction("edit") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${action==='edit' && 'active'}`}>
                      <i className="fa fa-solid fa-edit mr-2" />
                      Edit
                    </button>
                  </Col>
                  <Col className="" sm="12" md="4">
                    <button onClick={() => { setAction("delete") }} type="button" class={`btn btn-block bg-transparent text-black-50 border-gray border ${action==='delete' && 'active'}`}>
                      <i className="fa fa-solid fa-trash-o mr-2" />
                      Delete
                    </button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          {loadCard()}
        </Col>
      </Row>
    </div>
  </>
);
}

export default Settings;
