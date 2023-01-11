import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
 fr: {
  translation: {
   "login": "CONNEXION",
   "Forgot my password?": "Mot de passe oublié ?",
   "Forgot password?": "Mot de passe oublié?",
   "Forgot password text": "Tu as oublié ton mot de passe ? Aucun problème. Il suffit de saisir l'adresse électronique associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
   "Email or password incorrect.": "Email ou mot de passe incorrect.",
   "Back to login": "Retour à la page de connexion",
   "Wrong Email": "Email incorrect.",
   "An email has been sent.": "Un e-mail a été envoyé.",
   "Set New Password": "Definir Un Nouveau Mot De Passe",
   "New Password": "Nouveau mot de passe",
   "ReType New Password": "Retapez le nouveau mot de passe",
   "email": "Email",
   "password": "Mot de passe",
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
   "Hotel": "Hotel",
   "Regime": "Regime",
   "City": "Ville",
   "lang-selected": "Es",
   "Flight": "Vol",
   "Flights": "Vols",
   "Time": "Temps",
   "Filter-Folder": "Filtrer les dossiers",
   "Actions": "Actions",
   "List-Of-Folders": "Liste des dossiers",
   "Category": "Catégorie",
   "Folders": "Dossiers",
   "number_of_nights": "Nombre de nuits",
   "send": "Envoyer"
  }
 },
 es: {
  translation: {
   "login": "ACCESO",
   "Forgot my password?": "¿Olvidé mi contraseña?",
   "Forgot password?": "¿Se te olvidó tu contraseña?",
   "Forgot password text": "¿Has olvidado tu contraseña? No se preocupe. Introduzca la dirección de correo electrónico asociada a su cuenta y le enviaremos un enlace para restablecerla.",
   "Email or password incorrect.": "Correo electrónico o contraseña incorrecta.",
   "Back to login": "Volver a la página de inicio de sesión",
   "Wrong Email": "Correo electrónico incorrecto.",
   "An email has been sent.": "Un correo electronico ha sido enviado.",
   "Set New Password": "Establecer Nueva Contraseña",
   "New Password": "Nueva contraseña",
   "ReType New Password": "Vuelva a escribir la nueva contraseña",
   "email": "Correo electrónico",
   "password": "Contraseña",
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
   "Hotel": "Hotel",
   "Regime": "Régimen",
   "City": "Ciudad",
   "lang-selected": "Fr",
   "Flight": "Vuelo",
   "Flights": "Vuelos",
   "Time": "Hore",
   "Filter-Folder": "Filtrar carpetas",
   "Actions": "Comportamiento",
   "List-Of-Folders": "Lista de carpetas",
   "Category": "Categoría",
   "Folders": "Carpetas",
   "number_of_nights": "Número de noches",
   "send": "Enviar",
  }
 }
};

i18n
 .use(initReactI18next)
 .init({
  resources,
  lng: "fr",
  interpolation: {
   escapeValue: false
  }
 });

export default i18n;