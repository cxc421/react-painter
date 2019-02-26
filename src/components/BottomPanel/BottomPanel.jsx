import React, { useState } from 'react';
import styled from 'styled-components';
import SizeBlock from './SizeBlock.jsx';
import ColorBlock from './ColorBlock.jsx';
import ToggleIcon from './ToggleIcon';
import ModeArea from './ModeArea';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 40px;
  left: 50%;
  transform: ${props =>
    props.open ? 'translate(-50%, 0)' : 'translate(-50%, calc(100% + 40px))'};
  transition: transform 600ms;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 50px;
  padding: 16px 40px;
  white-space: nowrap;

  > * {
    height: 48px;
    vertical-align: middle;
    &:nth-child(n + 2) {
      margin-left: 40px;
    }
  }

  @media (max-width: 888px) {
    white-space: pre-wrap;
    padding: 16px 24px;

    > * {
      display: flex;

      &:nth-child(n + 2) {
        margin-left: 0px;
        margin-top: 10px;
      }
    }
  }
`;

function BottomPanel({
  size,
  setSize,
  onCheckSize,
  color,
  setColor,
  mode,
  setMode
}) {
  const [open, setOpen] = useState(true);
  const onTogglePanel = () => setOpen(!open);

  return (
    <>
      <Wrapper open={open}>
        <ModeArea mode={mode} setMode={setMode} />
        <SizeBlock size={size} onCheckSize={onCheckSize} setSize={setSize} />
        <ColorBlock color={color} setColor={setColor} />
      </Wrapper>
      <ToggleIcon open={open} onClick={onTogglePanel} />
    </>
  );
}

export default BottomPanel;
