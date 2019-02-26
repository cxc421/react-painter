import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown, MdBrush } from 'react-icons/md';

const Wrapper = styled.div`
  position: fixed;
  z-index: 0;
  width: 56px;
  height: 56px;
  left: 50%;
  margin-left: -28px;
  bottom: ${props => (props.open ? '120px' : '68px')};
  margin-bottom: -28px;
  background: white;
  border-radius: 100%;
  text-align: center;
  line-height: 56px;
  cursor: pointer;
  transition: all 600ms;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    transition: all 600ms;
    line-height: 56px;
  }

  .arrow-down-icon {
    position: relative;
    top: ${props => (props.open ? '-10px' : '0px')};
    opacity: ${props => (props.open ? '1' : '0')};
  }

  .brush-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${props => (props.open ? '0' : '1')};
  }
`;

export default ({ onClick = f => f, open = true }) => (
  <Wrapper onClick={onClick} open={open}>
    <MdKeyboardArrowDown size={24} className="arrow-down-icon" />
    <MdBrush size={24} className="brush-icon" />
  </Wrapper>
);
