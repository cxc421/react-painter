import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* background: pink; */
  display: inline-flex;
  align-items: center;

  input {
    margin: 0 8px 0 16px;
    border: none;
    outline: none;
    height: 100%;
    text-align: center;
    font-size: 20px;
    width: 74px;
    background: #e8e8e8;
    border-radius: 24px;
  }

  span {
    font-size: 20px;
  }
`;

function SizeBlock({ size, setSize, onCheckSize }) {
  const inputRef = useRef(null);

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      onCheckSize();
    }
  }

  function onKeyDown(e) {
    if (isNaN(size)) {
      return;
    }

    if (e.keyCode === 38) {
      return setSize(Number(size) + 1);
    }

    if (e.keyCode === 40) {
      return setSize(Number(size) - 1);
    }
  }

  useEffect(() => {
    const input = inputRef.current;
    input.selectionStart = input.selectionEnd = input.value.length;
  });

  return (
    <Wrapper>
      <span>SIZE:</span>
      <input
        type="text"
        ref={inputRef}
        value={size}
        onChange={e => setSize(e.target.value)}
        onBlur={onCheckSize}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
      />
      <span>px</span>
    </Wrapper>
  );
}

export default React.memo(SizeBlock);
