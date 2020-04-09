import React from "react";
import { Storage } from "../storage/Storage";
import { Parent } from "../baseComponents/Parent";

export const MyStorage = ({}) => {
  return (
    <>
      <Parent
        header={{
          name: "Lager 2",
          setType: () => console.log(),
          type: "Lager 2",
          sub_pages: [],
        }}
      />
      <Storage />;
    </>
  );
};
