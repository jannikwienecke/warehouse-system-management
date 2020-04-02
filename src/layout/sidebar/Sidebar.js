import React, { useState, useEffect } from "react";
import { FaBars, FaCaretDown } from "react-icons/fa";
import { navListArr } from "./data";
import { sb } from "./styles";
import { Redirect } from "react-router";

export const Sidebar = ({ close }) => {
  const [isVisible, setIsVisible] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const closeItemMenu = item => {
    if (item === isVisible) {
      setIsVisible(false);
      setLastVisible(item);
    } else {
      setIsVisible(item);
    }
  };

  const validateIsVisible = item => {
    if (isVisible === null) return null;

    if (isVisible === false) {
      if (item === lastVisible) {
        return false;
      } else {
        return null;
      }
    } else {
      return isVisible === item ? true : null;
    }
  };

  const listItems = () => {
    return navListArr.map((el, key) => (
      <sb.ListRow key={key}>
        <sb.ListHeader onClick={() => closeItemMenu(key)}>
          <h5>
            {el.header.text}{" "}
            <sb.IconHeader>
              <FaCaretDown />{" "}
            </sb.IconHeader>
          </h5>
        </sb.ListHeader>
        <sb.ListItemWrapper isVisible={validateIsVisible(key)}>
          {el.children.map((child, childKey) => (
            <sb.ListItem
              onClick={() => setRedirect({ url: child.url })}
              key={childKey}
            >
              {child.name}
            </sb.ListItem>
          ))}
        </sb.ListItemWrapper>
      </sb.ListRow>
    ));
  };

  if (redirect) {
    setTimeout(() => {
      setRedirect(null);
    }, 2);

    console.log("hier ...", lastVisible, isVisible);

    if (isVisible !== null) {
      console.log("set bacl");

      setIsVisible(null);
    }
    return <Redirect to={redirect.url} />;
  }
  return (
    <>
      <sb.CloseSidebarWrapper>
        <sb.CloseSidebarBtn onClick={close}>
          <FaBars />
        </sb.CloseSidebarBtn>
      </sb.CloseSidebarWrapper>

      <sb.Header>
        <h3>Kategorien</h3>
      </sb.Header>

      <sb.ListWrapper>{listItems()}</sb.ListWrapper>
    </>
  );
};
