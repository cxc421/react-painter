import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MdSave,
  MdFullscreen,
  MdRedo,
  MdUndo,
  MdKeyboardArrowUp
} from 'react-icons/md';
import Button from './Button';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  text-align: center;
  transform: translateY(${props => (props.open ? '0' : '-100%')});
  transition: 600ms;

  > * {
    vertical-align: middle;
  }
`;

const CollapseButton = styled.div`
  width: 56px;
  height: 56px;
  position: absolute;
  z-index: -1;
  left: 50%;
  margin-left: -28px;
  bottom: -28px;
  background: white;
  border-radius: 100%;
  text-align: center;
  line-height: 56px;
  cursor: pointer;

  > * {
    margin-bottom: -20px;
    transform: rotate(${props => (props.open ? '0' : '-180')}deg);
    transition: transform 600ms;
  }
`;

function TopPannel({
  onClickClearBtn = f => f,
  onClickRedoBtn,
  onClickUndoBtn,
  onClickSaveBtn,
  canRedo = false,
  canUndo = false
}) {
  const [open, setOpen] = useState(true);
  const togglePanel = () => setOpen(!open);

  return (
    <Wrapper open={open}>
      <Button Icon={MdSave} text="SAVE" onClick={onClickSaveBtn} />
      <Button Icon={MdFullscreen} text="CLEAR ALL" onClick={onClickClearBtn} />
      <Button
        Icon={MdUndo}
        text="UNDO"
        onClick={onClickUndoBtn}
        disabled={!canUndo}
      />
      <Button
        Icon={MdRedo}
        text="REDO"
        onClick={onClickRedoBtn}
        disabled={!canRedo}
      />
      <CollapseButton open={open} onClick={togglePanel}>
        <MdKeyboardArrowUp size={24} />
      </CollapseButton>
    </Wrapper>
  );
}

export default TopPannel;
