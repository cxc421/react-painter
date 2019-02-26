import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Canvas from './components/Canvas.jsx';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body, input {
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
  }
  body {
    overflow: hidden;
    user-select: none;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Canvas />
    </>
  );
}

export default App;
