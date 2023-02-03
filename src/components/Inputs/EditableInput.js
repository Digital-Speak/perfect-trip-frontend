import React, { useState } from "react";
import {
   Input,
} from "reactstrap";

function EditableInput({ t, text = "-", onTextChange, style = {}, disabled = false }) {
   const [editMode, setEditMode] = useState(false)
   const [inputValue, setInputValue] = useState(text)

   return (
      <span style={{ "cursor": "pointer" }} onBlur={() => {
         setEditMode(false);
         onTextChange(inputValue);
      }} onDoubleClick={() => {
         if (disabled === false) {
            setEditMode(!editMode);
         }
      }}>
         {editMode ? <Input disabled={disabled} autoFocus value={inputValue} onChange={(event) => {
            setInputValue(event.target.value);
         }} /> : <span>{text}</span>}
      </span>
   );
}

export default EditableInput;
