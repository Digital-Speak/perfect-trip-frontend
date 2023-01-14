import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col
} from "reactstrap";

function PaxNumber({
  t,
  cb,
  disabled = false
}) {

  const [typeHB, setTypeHb] = useState([
    {
      label: "DBL",
      plus: 2,
      dispaly: 0,
      nbr: 0,
    }, {
      label: "TWIN",
      plus: 2,
      dispaly: 0,
      nbr: 0,
    }, {
      label: "TRPL",
      dispaly: 0,
      plus: 3,
      nbr: 0,
    }, {
      label: "SGL",
      plus: 1,
      dispaly: 0,
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
              disabled={disabled}
              onClick={() => {
                setTypeHb(typeHB.map((item) => item.label === dataItem.label ? { ...item, nbr: item.nbr + item.plus, dispaly: item.dispaly + 1 } : item))
              }}
              style={{ "height": "30px", alignItems: "center", display: "flex", fontSize: "22px" }} color="primary" type="button">+</Button>
            <Button
              disabled={disabled}
              onClick={() => {
                setTypeHb(typeHB.map((item) => item.label === dataItem.label ? { ...item, nbr: item.nbr - 1 < 0 ? item.nbr : item.nbr - item.plus, dispaly: item.nbr - 1 < 0 ? item.dispaly : item.dispaly - 1 } : item))
              }}
              style={{ "height": "30px", display: "flex", alignItems: "center", fontSize: "22px" }} color="danger" type="button">-</Button>
          </span>
          <span>{`${dataItem.dispaly} ${dataItem.label}`}</span>
        </Col>
      )}
    </Row>
  );
}

export default PaxNumber;
