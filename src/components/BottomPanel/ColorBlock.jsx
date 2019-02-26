import React from 'react';
import styled from 'styled-components';
import ColorCircle from './ColorCircle.jsx';

const Wrapper = styled.div`
  /* background: pink; */
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  span {
    margin-right: 16px;
  }
`;

function ColorBlock({ color: selectColor, setColor: setSelectColor }) {
  return (
    <Wrapper>
      <span>COLOR:</span>
      {['#ffffff', '#000000', '#9BFFCD', '#00CC99', '#01936F'].map(
        (color, idx) => (
          <ColorCircle
            select={color === selectColor}
            color={color}
            key={idx}
            onClick={() => setSelectColor(color)}
          />
        )
      )}
    </Wrapper>
  );
}

export default ColorBlock;
