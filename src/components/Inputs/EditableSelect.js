import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function EditableSelect({ t, text, data = [], cb }) {
 const [editMode, setEditMode] = useState(false)
 const [inputValue, setInputValue] = useState(text)
 return (
  <span style={{ "cursor": "pointer" }} onBlur={() => {
   setEditMode(false);
  }} onDoubleClick={() => {
   setEditMode(!editMode);
  }}>
   {editMode ? 
    <Autocomplete
     disablePortal
     id="cat"
     options={data}
     sx={{ width: "auto" }}
     inputValue={inputValue}
     value={inputValue}
     renderInput={(params) => <TextField {...params} label={text} />}
     onInputChange={(event, newInputValue) => {
      setInputValue(newInputValue);
      cb(newInputValue);
     }}
    />
   : <span>{text}</span>}
  </span>
 );
}

export default EditableSelect;
