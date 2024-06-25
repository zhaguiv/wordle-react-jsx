import { useState, useMemo } from "react";
import React from 'react';
import Tile from "./Tile";
import '../styles/Row.css'

const Row = React.memo(({currGuess, submitted, solution}) => {

    const NUM_TILES = 5;
    const rowAsTiles = []

    //each tile should have its own freq map
    const frequencyMap = useMemo(() => {
        if(solution.length == 0)
            return {};

        return [...solution].reduce( (acc, curr)=>{
            acc[curr]? acc[curr] += 1 : acc[curr]=1;
            return acc;
        }, {})
    }, [solution]);

    const updateFrequencyWithSubmitted = () => {
        console.log('updating frequency map');

        [...currGuess].map( (guessLetter, idx) => {
            if(guessLetter == solution[idx])
                frequencyMap[guessLetter] -= 1;
        })
    }

    const removeLetterFromFreq = ( letter ) => {
        frequencyMap[letter] -= 1;
    }

    if(submitted) {
        updateFrequencyWithSubmitted();
    }

    for(let i=0; i< NUM_TILES; i++){
        let tileStyle = ''

        if(submitted) {
            if(currGuess[i] === solution[i]){
                tileStyle = 'correct';
            } else if (frequencyMap[currGuess[i]] && frequencyMap[currGuess[i]]>0) {
                removeLetterFromFreq(currGuess[i]);
                tileStyle = 'partial'
            } else {
                tileStyle = 'wrong'
            }
        }
        rowAsTiles.push(<Tile currLetter={currGuess[i] ?? ''} tileStyle={tileStyle} key={i} ></Tile>)
    }

    return (
        <div className="board-row">
            {rowAsTiles}
        </div>)
});

export default Row;