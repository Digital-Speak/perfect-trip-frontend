import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
 fr: {
  translation: {
   "Accueil": "Accueil",
   "New-Folder": "Nouveau dossier",
   "lang": "Fr",
   "Save": "Sauvegarder",
   "Cancel": "Anular",
   "Period": "Période",
   "Folder-Number": "Dossier N°",
   "Agency": "Agence",
   "Client-Ref": "Ref Cleint",
   "Select": "Sélectionner...",
   "Circuit": "Circuit",
   "Cat": "Catégorie",
   "FullName": "Nom et Prénom",
   "Type-HB": "Type HB",
   "From": "Du",
   "To": "Au",
   "From-time": "De",
   "To-time": "A",
   "Pax-Number": "Nombre Pax",
   "Hotels": "Hôtels",
   "Regime": "Regime",
   "City": "Ville",
   "lang-selected": "Es",
   "Flight": "Vol",
   "Flights": "Vols",
   "Time": "Temps",
   "Filter-Folder": "Filtrer les dossiers",
   "Actions": "Actions"
  }
 },
 es: {
  translation: {
   "Accueil": "Inicio",
   "New-Folder": "Nueva Carpeta",
   "lang": "Es",
   "Save": "Ahorrar",
   "Cancel": "Annuler",
   "Period": "Período",
   "Folder-Number": "Archivo No.",
   "Agency": "Agencia",
   "Client-Ref": "Cliente de referencia",
   "Select": "Seleccione...",
   "Circuit": "Circuito",
   "Cat": "Categoría",
   "FullName": "Nombre completo",
   "Type-HB": "Typo HB",
   "From": "Desde",
   "To": "A",
   "From-time": "De",
   "To-time": "A",
   "Pax-Number": "Número De Pasajero",
   "Hotels": "Hoteles",
   "Regime": "Régimen",
   "City": "Ciudad",
   "lang-selected": "Fr",
   "Flight": "Vuelo",
   "Flights": "Vuelos",
   "Time": "Hore",
   "Filter-Folder": "Filtrar carpetas",
   "Actions": "Comportamiento"
  }
 }
};

i18n
 .use(initReactI18next) // passes i18n down to react-i18next
 .init({
  resources,
  lng: "fr",
  interpolation: {
   escapeValue: false 
  }
 });

export default i18n;