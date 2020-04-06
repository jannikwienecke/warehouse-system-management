import neueAuslagerung from "./neueAuslagerung/store";
import { combineReducers } from "redux";

const auslagerung = {
  neueAuslagerung,
};

export default combineReducers(auslagerung);
