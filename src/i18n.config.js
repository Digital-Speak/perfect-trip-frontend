import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./assets/config/localization/es.json";
import fr from "./assets/config/localization/fr.json";

i18n
 .use(initReactI18next)
 .init({
  resources: {
   fr: fr,
   es: es
  },
  lng: "fr",
  interpolation: {
   escapeValue: false
  }
 });

export default i18n;