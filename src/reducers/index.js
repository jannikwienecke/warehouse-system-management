import { combineReducers } from "redux";
import base from "../baseComponents/store/reducer";
import auslagerung from "../auslagerung/reducer";
// import einlagerung from "../einlagerung/reducer";
import einlagerung from "../einlagerung/store";
export default combineReducers({ base, einlagerung, auslagerung });
