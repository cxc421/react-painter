import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  /* background: pink; */
  padding: 16px 0;
  margin: 0 6px;
`;

const Container = styled.div`
  /* background: skyblue; */
  padding-right: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 300ms;
  &:hover {
    background: lightgrey;
  }

  > * {
    vertical-align: middle;
  }

  .btn-text {
    margin-left: 4px;
  }
`;

function Button({ Icon = () => null, text = '' }) {
  return (
    <Wrapper>
      <Container>
        <Icon size={48} />
        <span className="btn-text">{text}</span>
      </Container>
    </Wrapper>
  );
}

export default Button;
