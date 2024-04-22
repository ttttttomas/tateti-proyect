import './App.css'
import { useState, useEffect } from 'react'


const TURNS = {
  X: 'x',
  O: 'o'
}


const Square = ({ children, isSelected, updateBoard, index })=> {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () =>{
    updateBoard(index)
  }

  return (
  <div onClick={handleClick} className={className}>
    {children}
  </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {

const [board, setBoard] = useState(Array(9).fill(null))

const [turn, setTurn] = useState(TURNS.X)

const [winner, setWinner] = useState(null)

const checkWinner = (boardtoCheck) =>{
  // REVISA EL TABLERO PARA VER SI LA X O LA U GANARON
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if(boardtoCheck[a] &&
      boardtoCheck[a] === boardtoCheck[b] &&
      boardtoCheck[a] === boardtoCheck[c]
    ){
      return boardtoCheck[a]
    }
  }
  return null

}

const resetGame = () =>{
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

const checkEndGame = (newBoard) =>{
  return newBoard.every((square) => square !== null)
}

const updateBoard = (index) =>{
  // NO SE ACTUALIZA LA POSICION SI YA TIENE ALGO
  if (board[index] || winner) return 
  // ACTUALIZAR EL TABLERO
  const newBoard =[...board]
  newBoard[index] = turn
  setBoard(newBoard)
  // CAMBIAR EL TURNO
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)
  // REVISAR SI ALGUIEN GANÓ
  const newWinner = checkWinner(newBoard)
  if(newWinner) {
    setWinner(newWinner)
// REVISAR SI HAY EMPATE    
  }else if (checkEndGame(newBoard)){
    setWinner(false)
  } 


}

  return (
    <>
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
        {board.map((_,index) =>{
          return (
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
        }
      </section>
      <section className='turn'>
        <Square isSelected= {turn === TURNS.X}>
          {TURNS.X}
        </Square >
        <Square isSelected= {turn === TURNS.O}>
          {TURNS.O}
        </Square >
      </section>

      {
      winner !== null && (
        <section className="winner">
          <div className='text'>
            <h2>
              {
                winner === false
                  ? "Empate" 
                  : "Ganó:"
              }
            </h2>

            <header className='win'>
              {winner && <Square>{winner} </Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )
      }
    </main>
      
    </>
  )
}

export default App
