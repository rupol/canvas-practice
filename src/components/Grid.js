import React, { useEffect } from "react";

function Grid() {
  const canvasRef = React.useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resolution = 20;

    canvas.width = 600;
    canvas.height = 300;

    const COLS = canvas.width / resolution;
    const ROWS = canvas.height / resolution;

    // create array of cells
    function buildGrid() {
      return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0));
    }
    const grid = buildGrid();
    console.log(grid);

    // plot grid based on cells
    function render(grid) {
      for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
          const cell = grid[col][row];

          ctx.beginPath();
          ctx.rect(col * resolution, row * resolution, resolution, resolution);
          ctx.fillStyle = cell ? "black" : "white";
          ctx.fill();
          ctx.stroke();
        }
      }
    }
    render(grid);
  });

  return <canvas ref={canvasRef} />;
}

export default Grid;
