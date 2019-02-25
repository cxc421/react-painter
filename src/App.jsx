import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Canvas from './components/Canvas.jsx';
import TopPanel from './components/TopPanel/TopPanel.jsx';

const GlobalStyle = createGlobalStyle`
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
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Canvas />
      <TopPanel />
    </>
  );
}

export default App;
