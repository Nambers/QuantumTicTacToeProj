import React from 'react';
import {Square} from './square.js'

function Board(props) {
  const renderSquare = (i) => {
    return <Square index={i} clickFunc={props.onClick} value={props.qubits[i]} />;
  }

  return (
    <div>
      <div className="status">{props.player}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export { Board }