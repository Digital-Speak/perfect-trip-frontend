import React, { useState } from "react";
import {
 Input,
} from "reactstrap";

function EditableInput({ t, text = "ssss", cb, style={} }) {
 const [editMode, setEditMode] = useState(false)
 const [inputValue, setInputValue] = useState(text)

 return (
  <span style={{"cursor": "pointer"}} onBlur={()=> {
   setEditMode(false);
   cb(inputValue);
  }} onClick={() => {
   setEditMode(!editMode);
  }}>
   {editMode ? <Input autoFocus value={inputValue} onChange={(event) => {
    setInputValue(event.target.value);
   }} /> : <span style={style}>{text}</span>}
  </span>
 );
}

export default EditableInput;
