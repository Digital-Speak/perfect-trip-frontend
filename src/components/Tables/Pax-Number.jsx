import React from "react";
import {
  Button,
  Row,
  Col
} from "reactstrap";

function PaxNumber({
  t,
  cb,
  data = [],
  disabled = false
}) {
  return (
    <Row className="mx-2">
      {data.map((dataItem, index) =>
        <Col md="3" style={{ "alignItems": "center", "display": "flex", "justifyContent": "space-between", "background": index % 2 === 0 ? "#EDEDED" : "white", borderRadius: "5px" }}>
          <span style={{ "alignItems": "center", "display": "flex", 'flexDirection': "row" }}>
            <Button
              disabled={disabled}
              onClick={() => {
                cb(data.map((item) => item.label === dataItem.label ? { ...item, nbr: item.nbr + item.plus, dispaly: item.dispaly + 1 } : item))
              }}
              style={{ "height": "30px", alignItems: "center", display: "flex", fontSize: "22px" }} color="primary" type="button">+</Button>
            <Button
              disabled={disabled}
              onClick={() => {
                cb(data.map((item) => item.label === dataItem.label ? { ...item, nbr: item.nbr - 1 < 0 ? item.nbr : item.nbr - item.plus, dispaly: item.nbr - 1 < 0 ? item.dispaly : item.dispaly - 1 } : item))
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
