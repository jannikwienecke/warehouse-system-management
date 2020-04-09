import React, { useEffect, useRef } from "react";

function useOutsideAlerter(ref, setOutside) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutside(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOutside]);
}

export const OutsideAlerter = props => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.setOutside);
  return <div ref={wrapperRef}>{props.children}</div>;
};
