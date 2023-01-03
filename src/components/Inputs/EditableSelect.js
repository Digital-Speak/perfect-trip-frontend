import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function EditableSelect({ t, text, data = [], onTextChange }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  return (
    <span style={{ "cursor": "pointer" }}>
      {editMode ?
        <Autocomplete
          freeSolo
          id="cat"
          options={data}
          sx={{ width: "auto" }}
          inputValue={inputValue}
          value={inputValue}
          renderInput={(params) =>
            <TextField {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }} />}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);

          }}
          onBlur={() => {
            setEditMode(false);
            onTextChange(inputValue);
          }}
        />
        : <span onDoubleClick={() => {
          setEditMode(!editMode);
        }}>{inputValue === "" ? data[0].label : inputValue}</span>}
    </span>
  );
}

export default EditableSelect;
