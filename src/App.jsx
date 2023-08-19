import { useState } from 'react';
import './Styles.scss'
import Board from './components/Board'
import StatusMessage from './components/StatusMessage';
import History from './components/History';
import { calculateWinner } from './calculateWinner'


function App() {

  const [history, setHistory] = useState([{ squares: Array(9).fill(null), isXNext: false }]);
  const [currentMove, setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove];
  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);


  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isChangingHistory = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isChangingHistory
        ? history[history.length - 1]
        : currentHistory[currentHistory.length - 1];

      const nextSquareState = lastGamingState.squares.map((squareValue, position) => {
        if (clickedPosition === position) {
          return lastGamingState.isXNext ? 'X' : 'O';
        }

        return squareValue
      });

      const base = isChangingHistory
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory

      return base.concat({
        squares: nextSquareState,
        isXNext: !lastGamingState.isXNext
      })

    });

    setCurrentMove(move => move + 1);

  };

  const moveTo = step => {
    setCurrentMove(step)
  };

  return (
    <div className='app'>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} winningSquares={winningSquares} />
      <h2>Current move history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  )
}

export default App
