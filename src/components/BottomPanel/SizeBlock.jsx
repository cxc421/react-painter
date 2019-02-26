import React from 'react';
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

function SizeBlock() {
  return (
    <Wrapper>
      <span>SIZE:</span>
      <input type="text" value={10} />
      <span>px</span>
    </Wrapper>
  );
}

export default SizeBlock;
