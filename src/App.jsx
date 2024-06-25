import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './components/Board';


function App() {

  const WORD_API_URL = `https://random-word-api.herokuapp.com/word?length=5`;

  const [solution, setSolution] = useState('');

  function logError(err) {
    console.error(`An error occurred: ${err}`)
  }

  useEffect( ()=> {
    const fetchWord = async () => {
      const resp = await fetch(WORD_API_URL).catch(logError);
      const respJson = await resp.json().catch(logError);
      let resUpper = respJson[0].toUpperCase();
      setSolution(resUpper);
    };

    fetchWord();
  }, []);


  return (
    <>
      <div>
        Hello world: {solution}

        <Board solution={solution}></Board>
      </div>
    </>
  )
}

export default App
