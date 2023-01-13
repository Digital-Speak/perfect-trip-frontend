import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col
} from "reactstrap";

function PaxNumber({
  t,
  cb
}) {

  const [typeHB, setTypeHb] = useState([
    {
      label: "DBL",
      plus: 2,
      nbr: 0,
    }, {
      label: "TWIN",
      plus: 2,
      nbr: 0,
    }, {
      label: "TRPL",
      plus: 3,
      nbr: 0,
    }, {
      label: "SGL",
      plus: 1,
      nbr: 0,
    }])

  useEffect(() => {
    cb(typeHB)
  }, [typeHB])

  return (
    <Row className="mx-2">
      {typeHB.map((dataItem, index) =>
        <Col md="3" style={{ "alignItems": "center", "display": "flex", "justifyContent": "space-between", "background": index % 2 === 0 ? "#EDEDED" : "white", borderRadius: "5px" }}>
          <span style={{ "alignItems": "center", "display": "flex", 'flexDirection': "row" }}>
            <Button
              onClick={() => { setTypeHb(typeHB.map((item) => item.label === dataItem.label ? { ...item, nbr: item.nbr + item.plus } : item)) }}
              style={{ "height": "30px", alignItems: "center", display: "flex", fontSize: "22px" }} color="primary" type="button">+</Button>
            <Button
              onClick={() => { setTypeHb(typeHB.map((item) => item.label === dataItem.label ? { ...item, nbr: item.nbr - 1 < 0 ? item.nbr : item.nbr - item.plus } : item)) }}
              style={{ "height": "30px", display: "flex", alignItems: "center", fontSize: "22px" }} color="danger" type="button">-</Button>
          </span>
          <span>{`${dataItem.nbr} ${dataItem.label}`}</span>
        </Col>
      )}
    </Row>
  );
}

export default PaxNumber;
