import React, { useEffect, useRef, useState } from "react";
import { useGraphqlApi } from "../../functions/hooks.js/useGraphqlApi";
import { TableTours } from "./TableTours";
import { TableWithdrawals } from "./TableWithdrawals";
import { usePrevious } from "../../functions/hooks.js/usePrevious";
import { MyButton } from "../../components/button/MyButton";
import { useUpdate } from "../../functions/hooks.js/useUpdate";
import { Modal } from "../../baseComponents/Modal";
import { ValidationModal } from "./ValidationModal";

const dataType = "withdrawals";
export const SingleView = ({ tour, type, selectOpenTour }) => {
  const [complete, setComplete] = useState(null);
  let previousType = usePrevious(type);
  const {
    arrInput,
    tableData,
    tableColumns,
    fetchData,
    refetch,
  } = useGraphqlApi(dataType, {}, { tours: { id: tour.id } });

  useEffect(() => {
    if (previousType && previousType !== type) {
      selectOpenTour(null);
    }
  }, [type]);

  return (
    <div>
      <Header
        tour={tour}
        tableData={tableData}
        selectOpenTour={selectOpenTour}
      />

      <TableWithdrawals
        tableColumns={tableColumns}
        tableData={tableData}
        arrInput={arrInput}
        dataType={"withdrawals"}
        update={(openTour, x) => {
          selectOpenTour(openTour);
        }}
        fetchData={refetch}
      />
    </div>
  );
};

const Header = (props) => {
  const { tour, tableData } = props;
  if (!tour) return null;

  let splitName = tour.name.split("_tour_");
  let date = splitName[0].split("_").join("-");
  let tour_number = splitName[1];
  return (
    <>
      <h1 style={{ marginTop: "3rem" }}>
        Dattum: {date} - Tour Nr. {tour_number}
      </h1>
      <h2>Mitarbeiter: {tour.employee.name}</h2>
      <h2>Fahrzeug: {tour.vehicle.name}</h2>
      <FinishTour {...props} />;
    </>
  );
};

const FinishTour = ({ tour, tableData, selectOpenTour }) => {
  const [modal, showModal] = useState(null);

  return (
    <>
      <Modal setValues={showModal} values={modal}>
        <ValidationModal tour={tour} submit={() => selectOpenTour(null)} />
      </Modal>
      <MyButton onClick={() => showModal(true)}>Tour Abschließen</MyButton>
    </>
  );
};

// const { updateElement, query } = useUpdate(mutationParammeter);
// const [mutationParammeter, setMutationParameter] = useState({
//   idsToUpdate: values.id,
//   dataType,
// });

// const runMutation = (id, parameter, type) => {
//   const id = parseInt(id);
//   const queryList = [
//     {
//       modelName: dataType,
//       parameter: { id, ...parameter },
//     },
//   ];
//   setMutationParameter({
//     ...mutationParammeter,
//     type,
//     queryList,
//     // onCompleted,
//   });
// };

// const submitTour = () => {
//   runMutation(tour.id, {isOpen: false, type: 'put'})
// }
