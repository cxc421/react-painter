import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import TopPanel from './TopPanel/TopPanel.jsx';
import BottomPanel from './BottomPanel/BottomPanel.jsx';

const backgroundColor = '#e8e8e8';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: #e8e8e8;
  cursor: none;
`;

const Window = styled.div`
  border: dashed 3px blue;
  position: absolute;
  background: rgba(0, 0, 255, 0.1);
  cursor: move;
`;

const renderLoop = (() => {
  let canvas = null;
  let ctx = null;
  let dataImg = null;
  let canUpdate = true;
  let mode = 'mode_draw';
  let mouseX = -100;
  let mouseY = -100;
  let color = '#000';
  let size = 10;
  let updateKey = null;

  function resizeCanvas() {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
  }

  function drawCursor() {
    if (mode === 'mode_draw') {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
      return;
    }

    if (mode === 'mode_eraser') {
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = 'whitesmoke';
      ctx.fill();
      ctx.closePath();
      return;
    }
  }

  function update() {
    if (!canUpdate) {
      cancelAnimationFrame(updateKey);
      updateKey = requestAnimationFrame(update);
      return;
    }
    // console.log('u');
    if (dataImg) {
      let canvasPic = new Image();
      canvasPic.src = dataImg;
      canvasPic.onload = function() {
        resizeCanvas();
        ctx.drawImage(canvasPic, 0, 0);
        drawCursor();
        cancelAnimationFrame(updateKey);
        updateKey = requestAnimationFrame(update);
      };
    } else {
      resizeCanvas();
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawCursor();
      cancelAnimationFrame(updateKey);
      updateKey = requestAnimationFrame(update);
    }
  }

  return {
    init(newCanvas) {
      canvas = newCanvas;
      ctx = canvas.getContext('2d');
      update();
    },
    setCursor(x, y) {
      mouseX = x;
      mouseY = y;
    },
    setSpec(spec) {
      color = spec.color;
      size = spec.size;
      mode = spec.mode;
    },
    setDataImg(newDataImg) {
      dataImg = newDataImg;
    },
    stopUpdate() {
      canUpdate = false;
    },
    startUpdate() {
      canUpdate = true;
    }
  };
})();

function drawLineStart({ canvas, x, y, color = '#000', size = 10 }) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawLine({ canvas, x, y, color, size }) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineTo(x, y);
  ctx.stroke();
}

function clearCanvas({ canvas }) {
  const ctx = canvas.getContext('2d');
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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

let oriX = 0;
let oriY = 0;

export default () => {
  const canvasRef = useRef(null);
  const downloadTagRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [size, setSize] = useState(20);
  const [color, setColor] = useState('#000000');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [mode, setMode] = useState('mode_draw');

  const [win, setWin] = useState({ x: 0, y: 0, h: 0, w: 0 });
  const [showWin, setShowWin] = useState(false);
  const [isCreateWindow, setIsCreateWindow] = useState(false);
  const [isAdjusteWindow, setIsAdjusteWindow] = useState(false);

  // compute update
  const canRedo = history.length > historyIdx + 1;
  const canUndo = historyIdx > -1;
  const canvasStyle = {
    cursor: mode === 'mode_window' ? 'crosshair' : 'none'
  };
  const windowStyle = {
    left: win.x,
    top: win.y,
    width: win.w,
    height: win.h,
    display: showWin ? 'block' : 'none'
  };

  // Init RenderLoop
  useEffect(() => {
    renderLoop.setSpec({ size, color, mode });
    renderLoop.init(canvasRef.current);
  }, []);

  // Update RenderLoop Spec
  useEffect(() => {
    renderLoop.setSpec({ size, color, mode });
  }, [size, color, mode]);

  // Watch mode
  useEffect(() => {
    setShowWin(false);
  }, [mode]);

  // Watch isCreateWindow
  useEffect(() => {
    function onWindowMouseMove(e) {
      if (isCreateWindow) {
        let x = Math.min(win.x, e.clientX);
        let y = Math.min(win.y, e.clientY);
        let w = Math.abs(win.x - e.clientX);
        let h = Math.abs(win.y - e.clientY);
        setWin({ x, y, w, h });
      }
    }
    function onWindowMouseUp() {
      if (isCreateWindow) {
        setIsCreateWindow(false);
      }
    }
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    };
  }, [isCreateWindow]);

  // Watch isAdjustWIndow
  useEffect(() => {
    function onWindowMouseMove(e) {
      if (isAdjusteWindow) {
        let x = win.x + e.clientX - oriX;
        let y = win.y + e.clientY - oriY;
        setWin({ ...win, x, y });
      }
    }
    function onWindowMouseUp() {
      if (isAdjusteWindow) {
        setIsAdjusteWindow(false);
      }
    }
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    };
  }, [isAdjusteWindow]);

  function pushHistory(newDataImg) {
    let oldHistory = history.slice(0, historyIdx + 1);
    setHistory([...oldHistory, newDataImg]);
    setHistoryIdx(historyIdx + 1);
  }

  function onWinMouseDown(e) {
    oriX = e.clientX;
    oriY = e.clientY;
    setIsAdjusteWindow(true);
  }

  function onCanvasMouseDown(e) {
    setDrawing(true);
    renderLoop.stopUpdate();

    if (mode === 'mode_window') {
      setIsCreateWindow(true);
      setShowWin(true);
      setWin({ x: e.clientX, y: e.clientY, w: 3, h: 3 });
      return;
    }

    const correctSize = checkSize(size);
    setSize(correctSize);
    const newColor = mode === 'mode_draw' ? color : backgroundColor;
    drawLineStart({
      canvas: canvasRef.current,
      x: e.clientX,
      y: e.clientY,
      color: newColor,
      size: correctSize
    });
  }

  function onCanvasMouseMove(e) {
    if (mode === 'mode_window') {
      return false;
    }

    const x = e.clientX;
    const y = e.clientY;
    if (drawing) {
      const correctSize = checkSize(size);
      if (size !== correctSize) {
        setSize(correctSize);
      }
      const newColor = mode === 'mode_draw' ? color : backgroundColor;
      drawLine({
        canvas: canvasRef.current,
        x,
        y,
        color: newColor,
        size: correctSize
      });
    } else {
      renderLoop.setCursor(x, y);
    }
  }

  function onCanvasMouseUp() {
    if (mode === 'mode_window') {
      return false;
    }

    let newDataImg = canvasRef.current.toDataURL();
    pushHistory(newDataImg);
    renderLoop.setDataImg(newDataImg);
    renderLoop.startUpdate();
    setDrawing(false);
  }

  function onCanvasMouseLeave() {
    renderLoop.setCursor(-100, -100);
  }

  function onClickClearBtn() {
    clearCanvas({ canvas: canvasRef.current });
    let newDataImg = canvasRef.current.toDataURL();
    pushHistory(newDataImg);
    renderLoop.setDataImg(newDataImg);
  }

  function onCheckSize() {
    const correctSize = checkSize(size);
    setSize(correctSize);
  }

  function onClickUndoBtn() {
    if (canUndo) {
      if (historyIdx === 0) {
        clearCanvas({ canvas: canvasRef.current });
        let newDataImg = canvasRef.current.toDataURL();
        renderLoop.setDataImg(newDataImg);
      } else {
        const dataImg = history[historyIdx - 1];
        renderLoop.setDataImg(dataImg);
      }
      setHistoryIdx(historyIdx - 1);
    }
  }

  function onClickRedoBtn() {
    if (canRedo) {
      const dataImg = history[historyIdx + 1];
      renderLoop.setDataImg(dataImg);
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
      <Window style={windowStyle} onMouseDown={onWinMouseDown} />
      <Canvas
        ref={canvasRef}
        style={canvasStyle}
        onMouseDown={onCanvasMouseDown}
        onMouseMove={onCanvasMouseMove}
        onMouseUp={onCanvasMouseUp}
        onMouseLeave={onCanvasMouseLeave}
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
        mode={mode}
        setMode={setMode}
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
