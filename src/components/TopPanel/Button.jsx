import React from 'react';
import styled, { css as css2 } from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  /* background: pink; */
  padding: 14px 0;
  margin: 0 14px;
`;

const Container = styled.div`
  /* background: skyblue; */
  padding: 2px 0;
  padding-right: 8px;
  padding-left: 2px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 300ms;
  &:hover {
    background: #e8e8e8;
  }

  > * {
    vertical-align: middle;
  }
  .btn-text {
    margin-left: 4px;
  }

  ${({ disabled }) =>
    disabled &&
    css2`
    color: grey;
    pointer-events: none;
  `};
`;

function Button({
  Icon = () => null,
  text = '',
  onClick = f => f,
  disabled = false
}) {
  return (
    <Wrapper>
      <Container onClick={onClick} disabled={disabled}>
        <Icon size={48} />
        <span className="btn-text">{text}</span>
      </Container>
    </Wrapper>
  );
}

export default React.memo(Button);
