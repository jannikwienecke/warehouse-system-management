import React from "react";
import { NeueEinlagerung } from "./neueEinlagerung/NeueEinlagerung";
import { OffeneEinlagerungen } from "./offeneEinlagerung/OffeneEinlagerungen";
import { AlleEinlagerungen } from "./alleEinlagerungen/AlleEinlagerungen";
import Dashboard from "../baseComponents/Dashboard";

import {
  SUB_PAGES,
  NEUE_EINLAGERUNG,
  OFFENE_EINLAGERUNGEN,
  ALLE_EINLAGERUNGEN,
} from "./data";

const components = {
  [NEUE_EINLAGERUNG.name]: NeueEinlagerung,
  [OFFENE_EINLAGERUNGEN.name]: OffeneEinlagerungen,
  [ALLE_EINLAGERUNGEN.name]: AlleEinlagerungen,
};

export const DashboardEinlagerung = () => {
  return (
    <Dashboard
      header="EINLAGERUNG"
      sub_pages={SUB_PAGES}
      components={components}
    />
  );
};
