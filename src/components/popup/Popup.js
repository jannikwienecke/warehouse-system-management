import React from "react";
import PropTypes from "prop-types";
import {
  PopupCardWrapper,
  PopupUpper,
  PopupHeaderText,
  CloseBtn,
  PopupLower,
  PopupHeaderBtn,
  PopupLowerCard,
  Box,
  Layover,
  PopupUpperContent
} from "./styles";

const Popup = ({
  marginTop,
  color,
  height,
  heightHeader,
  children,
  headline,
  btnArr,
  visible,
  close
}) => {
  const btnList = () => {
    return btnArr.map((btn, index) => (
      <PopupHeaderBtn key={index} onClick={() => btn.func()}>
        {btn.text}
      </PopupHeaderBtn>
    ));
  };

  if (!visible) return <></>;
  return (
    <Layover>
      <Box.Container
        style={Box.Style}
        className="box"
        pose={visible ? "visible" : "hidden"}
      >
        <PopupCardWrapper marginTop={marginTop} height={height}>
          <PopupUpper color={color} height={heightHeader}>
            {close && <CloseBtn onClick={close}>CLOSE</CloseBtn>}
            <PopupUpperContent>
              <PopupHeaderText>{headline}</PopupHeaderText>

              {btnArr && btnList()}
            </PopupUpperContent>
          </PopupUpper>

          {children}
        </PopupCardWrapper>
      </Box.Container>
    </Layover>
  );
};

export default Popup;

Popup.propTypes = {
  headline: PropTypes.string,
  marginTop: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  heightHeader: PropTypes.string,
  btnArr: PropTypes.arrayOf(
    PropTypes.shape({
      func: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  close: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};
