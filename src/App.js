import React, { useState, useEffect } from "react";
import './App.css';

function App() {

const [score, setScore] = useState({user: 0, computer: 0});
const [gameResult, setGameResult] = useState('');
const [userChoice, setUserChoice] = useState('');
const [computerChoice, setComputerChoice] = useState('');

useEffect(() => {
  if (gameResult.includes('User')) {
    setScore((prevScore) => ({...prevScore, user: prevScore.user + 1 }));
  } else if(gameResult.includes('tie')) {
    setScore((prevScore) => ({...prevScore}));
  } else if (gameResult.includes('Computer')) {
    setScore((prevScore) => ({...prevScore, computer: prevScore.computer + 1}));
    }
  }, [gameResult]);

  useEffect(() => {
    if (computerChoice && userChoice) {
      let imageStyle = document.getElementById(`${computerChoice}`);
      let userStyle = document.getElementById(`${userChoice}`);
      if (userChoice === computerChoice) {
        imageStyle.classList.add('tie');
      } else {
        imageStyle.classList.add('computer');
        userStyle.classList.add('user');
      }
  
      // Remove either 'tie' or 'highlight' after 500 milliseconds
      setTimeout(() => {
        imageStyle.classList.remove('tie', 'computer');
        userStyle.classList.remove('user')
      }, 500);
    }
  }, [gameResult]);


const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissors'];
  const randomNumber = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomNumber];
  setComputerChoice(computerChoice);
  return computerChoice;
}

const playGame = (userChoice) => {
  
  let result;
  let computerChoice = getComputerChoice();

  if (userChoice === computerChoice) {
    result = 'Game is a tie.';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') 
    || (userChoice === 'paper' && computerChoice === 'rock')
    || (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'User won!'
  } else {
    result = 'Computer won.'
  }

  setUserChoice(userChoice);
  setGameResult(`Player: ${userChoice}   Computer: ${computerChoice}\n\n${result}`);
  return userChoice;
 }  

 
function handleReset() {
    setScore({user: 0, computer: 0});
    setGameResult('');
}


  return (

   <div className="container">

 {/* Left div starts here */}

    <div className="item-div">

      <h1>Rock<br/> Paper<br/> Scissors</h1>
      
    </div>
 {/* Left div ends here */}


 {/* Right div start here */}
    <div className="item-div">

    {/* Top box starts here */}  
    <div className="box-div">

         {/* Reset button */}

     <div className='reset-btn'>
         <button
         className="reset-button"
         onClick={handleReset}
        >reset</button>
     </div>

          {/* Scores */}

        <div className="score">
            <p>User: {score.user}   &nbsp;&nbsp;   Computer: {score.computer}</p>
        </div>

        {/* Game result goes here */}

      { gameResult ? (
        <div className="result">
            <pre>{gameResult}</pre>
        </div>
      ) : (
        <div className="result-placeholder"></div>
      )}

    </div>

    {/* Top box ends here */}


    {/* Bottom box starts here */} 

        {/* Choice options */}

    <div className='play-buttons'>

       {/* Rock Image */}
      <img 
      src='https://raw.githubusercontent.com/firstnamenika/rock-paper-scissors/main/public/img/rock.png' 
      alt="Rock"
      id="rock"
      onClick={() => playGame('rock')}
    />

       {/* Paper Image */}

        <img 
        src='https://raw.githubusercontent.com/firstnamenika/rock-paper-scissors/main/public/img/paper.png' 
        alt="Paper"
        id='paper'

        onClick={()=> playGame('paper')}
    />

       {/* Scissors Image */}

        <img 
        src='https://raw.githubusercontent.com/firstnamenika/rock-paper-scissors/main/public/img/scissors.png' 
        alt="Scissors"
        id='scissors'

        onClick={() => playGame('scissors')}
    />

    </div>

    </div>

    {/* Bottom box ends here */} 

  {/* Right div ends here */}
    </div>



  );

}


export default App;

