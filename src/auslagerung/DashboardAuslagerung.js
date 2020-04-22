import React, { useState } from "react";
import { NeueAuslagerung } from "./neueAuslagerung/NeueAuslagerung";
import {
  AlleAuslagerungen,
  Auslagerungen,
} from "./alleAuslagerungen/alleAuslagerungen";
import Dashboard from "../baseComponents/Dashboard";

import {
  SUB_PAGES,
  NEUE_AUSLAGERUNG,
  OFFENE_AUSLAGERUNGEN,
  ALLE_AUSLAGERUNGEN,
} from "./data";

const components = {
  [NEUE_AUSLAGERUNG.name]: NeueAuslagerung,
  [OFFENE_AUSLAGERUNGEN.name]: Auslagerungen,
  [ALLE_AUSLAGERUNGEN.name]: Auslagerungen,
};

export const DashboardAuslagerung = () => {
  return (
    <Dashboard
      header="AUSLAGERUNG"
      sub_pages={SUB_PAGES}
      components={components}
    />
  );
};
