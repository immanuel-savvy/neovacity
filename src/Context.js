import React from "react";

let Logged_user = React.createContext(),
  Logged_admin = React.createContext(),
  Footer_context = React.createContext(),
  Nav_context = React.createContext();

export { Logged_admin, Logged_user, Footer_context, Nav_context };
