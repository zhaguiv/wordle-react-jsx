import '../styles/Tile.css'
import React from 'react';


function Tile( { currLetter, tileStyle } ){

    console.log('rendering tile')

    const tileClass = currLetter? `tile ${tileStyle}` : "tile";

    return (
        <div className={tileClass}>
            {currLetter && <p> {currLetter}</p>}
        </div>
    )
}

export default React.memo(Tile);