import React, { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function EditableSelect({ t, text, data = [], onTextChange, editModeVal = false, disabled = false }) {
  const [editMode, setEditMode] = useState(editModeVal);
  const [inputValue, setInputValue] = useState(text);

  useEffect(() => {
    setInputValue(text);
  }, [text])

  return (
    <span style={{ "cursor": "pointer" }}>
      {editMode ?
        <Autocomplete
          freeSolo
          disabled={disabled}
          id="cat"
          options={data}
          sx={{ width: "auto" }}
          inputValue={inputValue}
          value={inputValue}
          renderInput={(params) =>
            <TextField
              fullWidth
              {...params}
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
          if (disabled === false) {
            setEditMode(!editMode);
          }
        }}>{inputValue}</span>}
    </span>
  );
}

export default EditableSelect;
