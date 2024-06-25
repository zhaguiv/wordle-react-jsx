
import { useState, useEffect, useMemo, useRef } from 'react';
import '../styles/Board.css'
import Row from './Row';

export default function Board( {solution} ) {

    const BOARD_ROWS = 6;
    const NUM_TILES = 5;

    const [currGuess, setCurrGuess] = useState('');
    const currRowIdx = useRef(0);
    const rows = useMemo( ()=> {
        return Array(BOARD_ROWS).fill({});
    }, []);

    const submitGuess = (finalGuess) => {
        rows[currRowIdx.current] = { ...rows[currRowIdx.current], 'guess': finalGuess, 'submitted': true}
        setCurrGuess('');
        currRowIdx.current += 1;
    }

    const updateTileWithGuess = (guess) => {
        rows[currRowIdx.current] = { ...rows[currRowIdx.current], 'guess': guess}
    }

    const handleKeyboard = (e) => {
        let capitalizedKey = e.key?.toUpperCase();

        if(capitalizedKey == 'ENTER') {
            if(currGuess.length < NUM_TILES)
                return;

            return submitGuess(currGuess);
        }

        if(capitalizedKey == 'BACKSPACE') {
            if(currGuess.length == 0)
                return;

            let newGuess = currGuess.slice(0, -1)
            updateTileWithGuess(newGuess);
            return setCurrGuess(newGuess)
        }

        if(currGuess.length == NUM_TILES) {
            return;
        }

        if(!capitalizedKey.match(/^[A-Z,a-z]{1}$/)) {
            return;
        }

        let newGuess = [...currGuess,capitalizedKey];
        updateTileWithGuess(newGuess);
        setCurrGuess(newGuess);

    }

    useEffect( () => {
        window.addEventListener('keydown', handleKeyboard);

        return () => {
            window.removeEventListener('keydown', handleKeyboard)
        }
    }, [currGuess])

    return (
        <div className="board">

            { rows.map( (currRow, index) => {
                return <Row currGuess={currRow.guess ?? ''} 
                            submitted={currRow.submitted ?? false} 
                            solution={solution} 
                            key={index} 
                        />
                         
            })} 

        </div>
    )

}