import React, { useEffect } from "react";

function ClickableGrid() {
  const canvasRef = React.useRef(null);
  let canvas = undefined;
  let ctx = undefined;
  const resolution = 20;

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 300;

    function drawGrid(context) {
      for (var x = 0.5; x < canvas.width + 1; x += resolution) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
      }

      for (var y = 0.5; y < canvas.height + 1; y += resolution) {
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
      }

      context.strokeStyle = "#ddd";
      context.stroke();
    }

    drawGrid(ctx);
  });

  function getSquare(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x:
        1 +
        (evt.clientX - rect.left) -
        ((evt.clientX - rect.left) % resolution),
      y: 1 + (evt.clientY - rect.top) - ((evt.clientY - rect.top) % resolution),
    };
  }

  function fillSquare(context, x, y) {
    context.fillStyle = "gray";
    context.fillRect(x, y, resolution - 1, resolution - 1);
  }

  function handleCanvasClick(e) {
    let mousePos = getSquare(canvas, e);
    fillSquare(ctx, mousePos.x, mousePos.y);
  }

  return <canvas ref={canvasRef} onClick={handleCanvasClick} />;
}

export default ClickableGrid;
