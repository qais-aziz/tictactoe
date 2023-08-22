import React, { useState, useEffect } from 'react';  // Import React and hooks
import ReactDOM from 'react-dom';
import './App.css';
import App from './App'; 

function ButtonGrid(props){
    const [gridObj, setGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    function checkWinner(){
      if(gridObj[0] === props.obj.turn && gridObj[0] === gridObj[1] && gridObj[1] === gridObj[2]){
        alert(`Player ${gridObj[0]} Won!`)
        disableAll()
        updateScore(props.obj.turn)
      }
      if(gridObj[3] === props.obj.turn && gridObj[3] === gridObj[4] && gridObj[4] === gridObj[5]){
        alert(`Player ${gridObj[3]} Won!`)
        disableAll()
        updateScore(props.obj.turn)
      }
      if(gridObj[6] === props.obj.turn && gridObj[6] === gridObj[7] && gridObj[7] === gridObj[8]){
        alert(`Player ${gridObj[6]} Won!`)
        disableAll()
        updateScore(props.obj.turn)
      }
      if(gridObj[0] === props.obj.turn && gridObj[0] === gridObj[3] && gridObj[3] === gridObj[6]){
        disableAll()
      }
      if(gridObj[1] === props.obj.turn && gridObj[1] === gridObj[4] && gridObj[4] === gridObj[7]){
        alert(`Player ${gridObj[1]} Won!`)
        disableAll()
        updateScore(props.obj.turn)
      }
      if(gridObj[2] === props.obj.turn && gridObj[2] === gridObj[5] && gridObj[5] === gridObj[8]){
        alert(`Player ${gridObj[2]} Won!`)
        disableAll()
        updateScore(props.obj.turn)
      }
      if(gridObj[0] === props.obj.turn && gridObj[0] === gridObj[4] && gridObj[4] === gridObj[8]){
        alert(`Player ${gridObj[0]} Won!`)
        disableAll()
        updateScore(props.obj.turn)
      }
      if(gridObj[2] === props.obj.turn && gridObj[2] === gridObj[4] && gridObj[4] === gridObj[6]){
        alert(`Player ${gridObj[2]} Won!`)
        disableAll()
        updateScore(props.obj.turn)
      }
    }
  
    function disableAll(){
      const buttons = document.querySelectorAll(".btn")
      buttons.forEach((element)=> element.classList.add("disabled"))
    }
    function action(e){
      e.currentTarget.textContent = props.obj.turn;
      e.currentTarget.classList.add("disabled")
      gridObj[parseInt(e.currentTarget.dataset.pos)-1] = props.obj.turn;
      checkWinner()
      changeTurn()
    }
    function changeTurn(){
      props.setObj((prev) => {
        return {
          ...prev,
          turn: props.obj.turn === "X" ? "O": "X"
        }
      }
    )}
    function updateScore(turn){
      const index = turn === "X" ? 0 : 1;
      const value = props.obj.score[index]+1
      const score = props.obj.score
      score[index] = value
      props.setObj((prev) => {
        return {
          ...prev,
          score: score  
        }
      })
    }
    function Reset(){
      const buttons = document.querySelectorAll(".btn")
      buttons.forEach((element) => {
        element.textContent = ".";
        element.classList.remove("disabled");
        setGrid([]);
      })
    }
    useEffect(() => {
        props.reset(Reset);
    }, [props] )
    return (
      <div className='grid'>
        <button className='btn' data-pos="1" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="2" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="3" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="4" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="5" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="6" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="7" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="8" type='button' onClick={action}>.</button>
        <button className='btn' data-pos="9" type='button' onClick={action}>.</button>
      </div>
    )
  }
  
  function Game(){
    const [gameObj, setGame] = useState({
      turn: "X",
      score: [0,0]
    })
    let gameReset;
    function reset(callback){
      gameReset = callback;
    }
    return (
      <>
        <h2>Player {gameObj.turn}'s turn!</h2>
        <ButtonGrid obj = {gameObj} setObj = {setGame} reset={reset}/>
        <div className='scores'>
          <p className='scoreX'>X's SCORE: {gameObj.score[0]}</p>
          <p className='scoreO'>O's SCORE: {gameObj.score[1]}</p>
        </div>
        
        <button className='restrt' type='button' onClick={() => gameReset()}>Restart</button>
      </>
    )
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />)
  export default App;
