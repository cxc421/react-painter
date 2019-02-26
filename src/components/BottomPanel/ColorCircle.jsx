import React from 'react';
import styled from 'styled-components';
import { MdDone } from 'react-icons/md';

const Circle = styled.div`
  width: 48px;
  height: 48px;
  border: solid 2px;
  background: ${props => props.color};
  border-color: ${({ color }) => {
    if (color === '#fff' || color === '#ffffff' || color === 'white')
      return '#000';
    return color;
  }};
  border-radius: 50%;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
  text-align: center;
  line-height: 48px;
  color: ${({ color }) => {
    if (color === '#000' || color === '#000000' || color === 'black') {
      return '#fff';
    }
    return '#000';
  }};
  cursor: pointer;
`;

function ColorCircle({ select = false, color = '#fff', onClick = f => f }) {
  return (
    <Circle color={color} onClick={onClick}>
      {select && <MdDone />}
    </Circle>
  );
}

export default ColorCircle;
