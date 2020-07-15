import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './App.css';

function TicTacToeComponent() {
  let [player1, setPlayer1] = useState('');
  let [player2, setPlayer2] = useState('');
  let [begin, setBegin] = useState(false);
  let [numberOfTurns, setNumberOfTurns] = useState(0);
  let [winnerAnnounced, setWinnerAnnounced] = useState(false);

  let grid = ['', '', '', '', '', '', '', '', ''];

  let resultSet = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  let [matrix, setMatrix] = useState(grid);
  let [turn, setTurn] = useState(1);
  let [xPlacement, setXPlacement] = useState([]);
  let [oPlacement, setOPlacement] = useState([]);

  function handlePlayer1Change(event) {
    setPlayer1(event.target.value);
  }

  function handlePlayer2Change(event) {
    setPlayer2(event.target.value);
  }

  function initiateGame() {
    if (player1 === player2)
      alert("Both players cannot have same names");
    else if (player1.length > 0 && player2.length > 0)
      setBegin(true);
    else
      alert('Please enter both player names');
  }

  function resetGame() {
    setPlayer1('');
    setPlayer2('');
    setBegin(false);
    setMatrix(grid);
  }

  function boxClick(position) {
    let matrixShadow = [...matrix];
    let xPlacementShadow = [...xPlacement];
    let oPlacementShadow = [...oPlacement];

    if (matrixShadow[position] !== "") {
      alert("You cannot override the value of that block!");
    }
    else {
      if (turn === 1) {
        matrixShadow[position] = 'X';
        xPlacementShadow.push(position);
        setXPlacement(xPlacementShadow);
        setTurn(2);
      } else {
        matrixShadow[position] = '0';
        oPlacementShadow.push(position);
        setOPlacement(oPlacementShadow);
        setTurn(1);
      }
      setNumberOfTurns(numberOfTurns + 1);
      setMatrix(matrixShadow);
    }
  }

  function calculateResult() {
    resultSet.forEach(solution => {
      if (xPlacement.includes(solution[0]) &&
        xPlacement.includes(solution[1]) &&
        xPlacement.includes(solution[2])) {
        alert(player1 + " is the winner");
        setWinnerAnnounced(true);
      }
      if (oPlacement.includes(solution[0]) &&
        oPlacement.includes(solution[1]) &&
        oPlacement.includes(solution[2])) {
        alert(player2 + " is the winner");
        setWinnerAnnounced(true);
      }

    });
  }

  useEffect(() => {
    if (numberOfTurns > 4) {
      calculateResult();
    }
    if (numberOfTurns === 9) {
      alert('Its a draw');
      setWinnerAnnounced(true);
    }
  }, [numberOfTurns]);

  function playAgain() {
    setMatrix(grid);
    setWinnerAnnounced(false);
    setNumberOfTurns(0);
    setTurn(1);
    setXPlacement([]);
    setOPlacement([]);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className='heading'>Lets Play Tic Tac Toe</h1>
      </Row>
      {begin === false ?
        <Row className="description">
          A two player tic tac toe game. Both players enter their names and click the begin button. Once the button is pressed, Player 1 gets X and Player 2 gets O. The game begins with player 1 who can decide where to put the X. Then the turn goes to player 2 who can do the same. The game will check for 3 consecutive X's or 0's, whoever makes the first strike wins. Game is either a win or a draw. Game announces winner at the end.
          </Row>
        : null}
      {begin === false ?
        <Form>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Player 1 Name" onChange={handlePlayer1Change} value={player1} />
            </Col>
            <Col>
              <Form.Control placeholder="Player 2 Name" onChange={handlePlayer2Change} value={player2} />
            </Col>
          </Form.Row>
        </Form>
        : null}
      {begin === false ?
        <Row className="buttonArea">
          <Button variant="outline-success" onClick={initiateGame}>Begin!</Button>
          <Button variant="outline-danger" className="reset-btn" onClick={resetGame}>Reset!</Button>
        </Row>
        : null}

      {begin === true ?
        <div className="gameArea">
          {winnerAnnounced === false ?
            <div>
              Player 1 is {player1} and will be using X <br />
                    Player 2 is {player2} and will be using 0 <br /><br />
                    Number of turns so far: {numberOfTurns} <br />
              <b>Its {turn === 1 ? player1 : player2}'s turn now!</b> <br />
            </div>
            : null}

          {winnerAnnounced === true ?
            <Row className="justify-content-center">
              <Button style={{ 'marginTop': '20px', 'marginRight': '10px' }} size="lg" variant="info" onClick={() => window.location.reload(false)}>Restart!</Button>
              <Button style={{ 'marginTop': '20px' }} size="lg" variant="success" onClick={playAgain}>Play Again!</Button>
            </Row>
            : null}

          <div className="tableArea">
            <Row>
              <Col>
                <table border="1px">
                  <tbody>
                    <tr>
                      <td><button className="boxButton" onClick={() => boxClick(0)} disabled={winnerAnnounced}> {matrix[0]} </button></td>
                      <td><button className="boxButton" onClick={() => boxClick(1)} disabled={winnerAnnounced}> {matrix[1]} </button></td>
                      <td><button className="boxButton" onClick={() => boxClick(2)} disabled={winnerAnnounced}> {matrix[2]} </button></td>
                    </tr>
                    <tr>
                      <td><button className="boxButton" onClick={() => boxClick(3)} disabled={winnerAnnounced}> {matrix[3]} </button></td>
                      <td><button className="boxButton" onClick={() => boxClick(4)} disabled={winnerAnnounced}> {matrix[4]} </button></td>
                      <td><button className="boxButton" onClick={() => boxClick(5)} disabled={winnerAnnounced}> {matrix[5]} </button></td>
                    </tr>
                    <tr>
                      <td><button className="boxButton" onClick={() => boxClick(6)} disabled={winnerAnnounced}> {matrix[6]} </button></td>
                      <td><button className="boxButton" onClick={() => boxClick(7)} disabled={winnerAnnounced}> {matrix[7]} </button></td>
                      <td><button className="boxButton" onClick={() => boxClick(8)} disabled={winnerAnnounced}> {matrix[8]} </button></td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
          {winnerAnnounced === false ?
            <Row className="endGameBtn">
              <Col>
                <Button variant="danger" onClick={() => window.location.reload(false)}>End Game</Button>
              </Col>
            </Row>
            : null}
        </div>
        : null}

    </Container>
  )
}

export default TicTacToeComponent;