import React, { useState } from "react";
import { NeueAuslagerung } from "./neueAuslagerung/NeueAuslagerung";
import Dashboard from "../baseComponents/Dashboard";

import {
  SUB_PAGES,
  NEUE_AUSLAGERUNG,
  OFFENE_AUSLAGERUNGEN,
  ALLE_AUSLAGERUNGEN,
} from "./data";

const components = {
  [NEUE_AUSLAGERUNG.name]: NeueAuslagerung,
  [OFFENE_AUSLAGERUNGEN.name]: null,
  [ALLE_AUSLAGERUNGEN.name]: null,
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
