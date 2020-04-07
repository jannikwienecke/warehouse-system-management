import { combineReducers } from "redux";
import base from "./baseComponents/store/reducer";
import einlagerung from "./einlagerung/store";
import auslagerung from "./auslagerung/store";

export default combineReducers({ base, einlagerung, auslagerung });
