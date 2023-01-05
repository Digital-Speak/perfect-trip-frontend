import React, { useState, useEffect } from "react";
import {
 Card,
 CardHeader,
 CardBody,
 CardTitle,
 FormGroup,
 Table,
 Row,
 Col
} from "reactstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import DefaultModal from "../components/Modals/DefaultModal"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import { getCities } from "../api/city";
import { getHotels } from "../api/hotel";
import { getDossier } from "../api/dossier";

function Filters() {
 const { t } = useTranslation();
 const [dataSource, setDataSource] = useState([]);

 const [dates, setDates] = useState({
  start: new Date(),
  end: new Date(),
 })

 const [cities, setCities] = useState({
  dataSource: [{
   id: -1,
   name: "All"
  }],
  mapedData: [{
   label: "All"
  }]
 })

 const [hotels, setHotels] = useState({
  dataSource: [{
   id: -1,
   city_id: -1,
   name: "All"
  }],
  mapedData: [{
   label: "All"
  }]
 })

 const [selectedCity, setSelectedCity] = useState({ id: -1, name: "All" })
 const [selectedHotel, setSelectedHotel] = useState({ id: -1, city_id: -1, name: "All" })

 const loadAppData = async () => {
  const payload_1 = await getCities();
  const payload_2 = await getHotels();

  if (!payload_1?.success || !payload_2?.success) return false;

  setCities({
   ...cities,
   dataSource: payload_1?.cities,
   mapedData: [...cities.mapedData, ...payload_1?.cities.map((item) => { return { label: item.name } })]
  })

  setHotels({
   ...hotels,
   dataSource: payload_2?.hotels,
   mapedData: [...hotels.mapedData, ...payload_2?.hotels.map((item) => { return { label: item.name } })]
  })
 }

 const loadDossierData = async (filters) => {
  const payload = await getDossier(filters);
  if (!payload?.success) return false;
  setDataSource(payload?.dossiers)
 }

 useEffect(() => {
  loadAppData()
 }, []);

 useEffect(() => {
  loadDossierData(
   {
    starts_at: dates.start,
    ends_at: dates.end,
    city_id: selectedCity.id,
    hotel_id: selectedHotel.id,
   }
  );
 }, []);

 useEffect(() => {
  loadDossierData(
   {
    starts_at: dates.start,
    ends_at: dates.end,
    city_id: selectedCity.id,
    hotel_id: selectedHotel.id,
   }
  );
 }, [selectedCity.id, selectedHotel.id, dates.start, dates.end]);

 useEffect(() => {
  const newMappedData = [{ label: "All" }, ...hotels?.dataSource
   .filter((item) => parseInt(item.city_id) === selectedCity.id)
   .map((item) => { return { label: item.name } })]
  setHotels({
   ...hotels,
   mapedData: newMappedData
  })

  setSelectedHotel({ id: -1, name: "All" })
 }, [selectedCity.id]);

 return (
  <>
   <div className="content"
    style={{
     "width": "90%",
     "justifyContent": "center",
     "marginLeft": "auto",
     "marginRight": "auto"
    }}>
    <Row>
     <Col md="12">
      <Card style={{
       paddingTop: "15px",
       paddingBottom: "15px",
      }}>
       <CardHeader>
        <CardTitle tag="h5">{t("Filter-Folder")}</CardTitle>
       </CardHeader>
       <CardBody >
        <Row>
         <Col md="3"> <FormGroup>
          <label>{t("Ville")}:</label>
          <Autocomplete
           disablePortal
           id="cities"
           sx={{ width: "auto" }}
           defaultValue={"All"}
           options={cities.mapedData}
           value={selectedCity.name}
           renderInput={(params) => <TextField fullWidth {...params} label={t("Select")} />}
           onInputChange={async (event, newInputValue) => {
            if (newInputValue === "All") return setSelectedCity({ id: -1, name: "All" });

            const targetItem = cities.dataSource.filter((city) => city.name === newInputValue);
            if (targetItem.length === 0) return false;
            const { id, name } = targetItem[0];
            setSelectedCity({ id, name });
           }}
          />
         </FormGroup>
         </Col>
         <Col md="3">
          <FormGroup>
           <label>{t("Hotel")}:</label>
           <Autocomplete
            disablePortal
            disabled={selectedCity.name === "All"}
            sx={{ width: "auto" }}
            defaultValue={"All"}
            options={hotels.mapedData}
            value={selectedHotel.name}
            renderInput={(params) => <TextField fullWidth {...params} label={t("Select")} />}
            onInputChange={async (event, newInputValue) => {
             if (newInputValue === "All") return setSelectedHotel({ id: -1, name: "All" });

             const targetItem = hotels.dataSource.filter((hotel) => hotel.name === newInputValue);
             if (targetItem.length === 0) return false;
             const { id, name, city_id } = targetItem[0];
             setSelectedHotel({ id, name, city_id });
            }}
           />
          </FormGroup>
         </Col>
         <Col md="3" xs="12">
          <label>{t("From")}</label>
          <FormGroup>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
             value={dates.start}
             inputFormat={"DD/MM/YYYY"}
             onChange={(newValue) => {
              const newDate = new Date(newValue.$d);
              // TODO: Handle the dates excaption
              // if (dates.end > newDate) return;
              setDates({ ...dates, start: newDate });
             }}
             renderInput={(params) => <TextField fullWidth {...params} />}
            />
           </LocalizationProvider>
          </FormGroup>
         </Col>
         <Col md="3" xs="12">
          <label>{t("To")}</label>
          <FormGroup>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
             value={dates.end}
             inputFormat={"DD/MM/YYYY"}
             onChange={(newValue) => {
              // TODO: Handle the dates excaption
              const newDate = new Date(newValue.$d);
              setDates({ ...dates, end: newDate });
             }}
             renderInput={(params) => <TextField fullWidth {...params} />}
            />
           </LocalizationProvider>
          </FormGroup>
         </Col>
        </Row>
       </CardBody>
      </Card>
     </Col>
    </Row>
    <Row>
     <Col>
      <Card>
       <CardBody>
        <Row>
         <Col>
          <Table responsive>
           <thead className="text-primary">
            <tr>
             <th style={{ textAlign: "center" }}>{t("From")}</th>
             <th style={{ textAlign: "center" }}>{t("To")}</th>
             <th style={{ textAlign: "center" }}>{t("Client-Ref")}</th>
             <th style={{ textAlign: "center" }}>{t("FullName")}</th>
             <th style={{ textAlign: "center" }}>{t("N° Pax")}</th>
             <th style={{ textAlign: "center" }}>{t("Note")}</th>
             <th style={{ textAlign: "center" }}>{t("Actions")}</th>
            </tr>
           </thead>
           <tbody>
            {dataSource.length !== 0 && dataSource?.map((item) => (
             <tr>
              <td style={{ textAlign: "center" }}>
               {new Date(item.startAt).toLocaleString('default', { month: 'long' }).substring(0, 3)}
               -
               {`${(new Date(item.startAt).getDate() < 10 ? "0" : "") + new Date(item.startAt).getDate()}`}
               -
               {`${new Date(item.startAt).getFullYear()}`}
              </td>
              <td style={{ textAlign: "center" }}>
               {new Date(item.endAt).toLocaleString('default', { month: 'long' }).substring(0, 3)}
               -
               {`${(new Date(item.endAt).getDate() < 10 ? "0" : "") + new Date(item.endAt).getDate()}`}
               -
               {`${new Date(item.endAt).getFullYear()}`}
              </td>
              <td style={{ textAlign: "center" }}>{item.clientRef}</td>
              <td style={{ textAlign: "center" }}>{item.client}</td>
              <td style={{ textAlign: "center" }}>
               {item.nbrpaxforhbtype.map(({ typepax, nbr }, index) => (
                <span style={{ "fontSize": "12px", }}>{index !== 0 ? '+' : ''} {nbr}{typepax}</span>
               ))}
              </td>
              <td style={{ textAlign: "center" }}>{item.note}</td>
              <td style={{ "fontSize": "20px", textAlign: "center" }}>
               <div onClick={() => {
                // TODO: Add delete fucntion
               }}
                type="button"
                className='text-success'>
                <i className="fa fa-cog text-success"></i>
               </div>
              </td>
             </tr>
            ))}
           </tbody>
          </Table>
         </Col>
        </Row>
       </CardBody>
      </Card>
     </Col>
    </Row>
    <DefaultModal t={t} />
   </div>
  </>
 );
}
export default Filters;
