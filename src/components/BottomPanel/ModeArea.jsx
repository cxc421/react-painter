import React from 'react';
import styled from 'styled-components';
import { MdBrush, MdBorderClear } from 'react-icons/md';
import { FaEraser } from 'react-icons/fa';

const Wrapper = styled.div`
  display: inline-flex;
  /* background: grey; */
  height: auto !important;
  white-space: nowrap;

  > * {
    margin-left: 10px;
    padding: 2px;
    border-radius: 10px;
    &:first-child {
      margin-left: 0;
    }

    &:hover {
      background: #e8e8e8;
    }

    /* background: ${props => (props.select ? 'grey' : 'pink')}; */
    cursor: pointer;
    &.select {
      background: lightgray;
    }
  }
`;

export default ({ mode, setMode }) => {
  return (
    <Wrapper>
      {[
        { Icon: MdBrush, modeName: 'mode_draw' },
        { Icon: FaEraser, modeName: 'mode_eraser' },
        { Icon: MdBorderClear, modeName: 'mode_window' }
      ].map(({ Icon, modeName }) => (
        <Icon
          key={modeName}
          size={52}
          className={`${modeName === mode ? 'select' : ''}`}
          onClick={() => setMode(modeName)}
        />
      ))}
    </Wrapper>
  );
};
