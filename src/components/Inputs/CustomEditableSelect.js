import React, { useState } from "react";

function CustomEditableSelect({ t, text, data = [], cb, id, disabled = false }) {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(text);
  return (
    <span style={{ "cursor": "pointer" }} onBlur={() => {
      setEditMode(false);
    }} onDoubleClick={() => {
      if (disabled === false) {
        setEditMode(!editMode);
      }
    }}>
      {editMode ?
        <select
          className="form-control"
          style={{ "height": "55px" }}
          defaultValue={text}
          onChange={(event) => {
            var index = event.nativeEvent.target.selectedIndex;
            setNewText(event.nativeEvent.target[index].text);
            cb(event.nativeEvent.target[index].text, event.target.value);
            setEditMode(false);
          }}
          aria-label="Default select example">
          <option value={id} className="form-check-input" key={232}>{text}</option>
          {data?.length !== 0 && data.map((element, index) => <option value={element?.id} className="form-check-input" key={index}>{element?.name}</option>)}
        </select>
        : <span>{newText}</span>}
    </span>
  );
}

export default CustomEditableSelect;
