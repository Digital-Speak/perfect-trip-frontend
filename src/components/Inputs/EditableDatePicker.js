import React, { useState } from "react";
import {
  Input,
} from "reactstrap";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

function EditableDatePicker({ t, selectedDate, onDateChange, disabled = false }) {
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(selectedDate)
  return (
    <span style={{ "cursor": "pointer" }} onBlur={() => {
      setEditMode(false);
    }} onDoubleClick={() => {
      if (disabled === false) {
        setEditMode(!editMode);
      }
    }}>
      {editMode ? <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={inputValue}
          disabled={disabled}
          inputFormat={"DD/MM/YYYY"}
          onChange={(newValue) => {
            const newDate = new Date(newValue.$d);
            setInputValue(newDate)
            onDateChange(newDate)
          }}
          renderInput={(params) => <TextField style={{ "width": "150px", "height": "10px" }} {...params} />}
        />
      </LocalizationProvider> : <span>{`${(new Date(selectedDate).getDate() < 10 ? "0" : "") + new Date(selectedDate).getDate()} 
    - 
    ${new Date(selectedDate).toLocaleString('default', { month: 'long' }).substring(0, 3)}`}</span>}
    </span>
  );
}

export default EditableDatePicker;
