import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import TopPanel from './TopPanel/TopPanel.jsx';
import BottomPanel from './BottomPanel/BottomPanel.jsx';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: #e8e8e8;
`;

const resizeCanvas = (() => {
  let preWidth = null;
  let preHeight = null;
  return canvas => {
    const { width, height } = canvas.getBoundingClientRect();
    if (width !== preWidth || height !== preHeight) {
      canvas.width = width;
      canvas.height = height;
      preWidth = width;
      preHeight = height;
      console.log('resize');
    }
  };
})();

function drawLineStart(canvas, x, y, color = '#000', size = 10) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.moveTo(x, y);
}

function drawLine(canvas, x, y) {
  const ctx = canvas.getContext('2d');
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawDataImg(canvas, dataImg) {
  resizeCanvas(canvas);
  // console.log('draw');
  const ctx = canvas.getContext('2d');
  var canvasPic = new Image();
  canvasPic.src = dataImg;
  canvasPic.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasPic, 0, 0);
    console.log('draw');
  };
}

function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const checkSize = (() => {
  let oldSize = null;
  return newSize => {
    if (null === oldSize) {
      oldSize = newSize;
      return oldSize;
    }
    const tmpSize = parseInt(newSize, 10);
    if (isNaN(tmpSize)) {
      return oldSize;
    }
    if (tmpSize < 1) {
      oldSize = 1;
    } else {
      oldSize = tmpSize;
    }
    return oldSize;
  };
})();

export default () => {
  const canvasRef = useRef(null);
  const downloadTagRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [size, setSize] = useState(10);
  const [color, setColor] = useState('#000000');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  console.log({ history, historyIdx });
  const canRedo = history.length > historyIdx + 1;
  const canUndo = historyIdx > -1;

  useEffect(() => {
    resizeCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const dataImg = history[historyIdx];
      if (dataImg) {
        drawDataImg(canvasRef.current, dataImg);
      } else {
        resizeCanvas(canvasRef.current);
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  function pushHistory() {
    let oldHistory = history.slice(0, historyIdx + 1);
    setHistory([...oldHistory, canvasRef.current.toDataURL()]);
    setHistoryIdx(historyIdx + 1);
  }

  function onCanvasMouseDown(e) {
    setDrawing(true);
    const correctSize = checkSize(size);
    setSize(correctSize);
    drawLineStart(canvasRef.current, e.clientX, e.clientY, color, correctSize);
  }

  function onCanvasMouseMove(e) {
    if (drawing) {
      drawLine(canvasRef.current, e.clientX, e.clientY);
    }
  }

  function onCanvasMouseUp() {
    setDrawing(false);
    pushHistory();
  }

  function onClickClearBtn() {
    clearCanvas(canvasRef.current);
    pushHistory();
  }

  function onCheckSize() {
    const correctSize = checkSize(size);
    setSize(correctSize);
  }

  function onClickUndoBtn() {
    if (canUndo) {
      if (historyIdx === 0) {
        clearCanvas(canvasRef.current);
      } else {
        const dataImg = history[historyIdx - 1];
        drawDataImg(canvasRef.current, dataImg);
      }
      setHistoryIdx(historyIdx - 1);
    }
  }

  function onClickRedoBtn() {
    if (canRedo) {
      const dataImg = history[historyIdx + 1];
      drawDataImg(canvasRef.current, dataImg);
      setHistoryIdx(historyIdx + 1);
    }
  }

  function onClickSaveBtn() {
    const dataURL = canvasRef.current.toDataURL('image/png');
    const aTag = downloadTagRef.current;
    aTag.href = dataURL;
    aTag.download = 'canvas-' + new Date().toISOString() + '.png';
    aTag.click();
  }

  return (
    <>
      <Canvas
        ref={canvasRef}
        onMouseDown={onCanvasMouseDown}
        onMouseMove={onCanvasMouseMove}
        onMouseUp={onCanvasMouseUp}
      />
      <TopPanel
        onClickClearBtn={onClickClearBtn}
        onClickUndoBtn={onClickUndoBtn}
        onClickRedoBtn={onClickRedoBtn}
        onClickSaveBtn={onClickSaveBtn}
        canRedo={canRedo}
        canUndo={canUndo}
      />
      <BottomPanel
        size={size}
        setSize={setSize}
        onCheckSize={onCheckSize}
        color={color}
        setColor={setColor}
      />
      <a
        href="#?file"
        style={{ display: 'none' }}
        hidden={true}
        ref={downloadTagRef}
      >
        Download Link
      </a>
    </>
  );
};
