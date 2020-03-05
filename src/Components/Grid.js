import React, {useState, useEffect} from 'react';
import './Grid.scss';
import Snake from './Snake';
// Creating the instance of the snake
let s = new Snake();


function Grid({size}) {
    size = parseInt(size);

    // coordSnake is an object that has the coordinates of each part of the snake
    const [coordSnake, setCoordSnake] = useState({'r0c0': null});

    useEffect( () => {
        // Creating a setTimeOut to simulate the speed of the snake
        const id = setTimeout(() => {
            s.update();

            let coordR1C1 = {};

            for (const coord of s.tail) {
                coordR1C1[`r${coord.y}c${coord.x}`] = null;
            }

            setCoordSnake(coordR1C1);
        }, 500);

        return () => {
            clearTimeout(id);
        };
    } )

    // Creating and empty array in order to map over them
    let rows = new Array(size).fill();
    let columns = new Array(size).fill();

    // Styles
    const rowStyles = {
        height: 1/size*100 + '%'
    }
    
    rows = rows.map( (value, row) =>
        <Row key={row} style={rowStyles}>
            { columns.map( (value, column) =>
                <Column key={column} size={size} propKey={`r${row}c${column}`} coordSnake={coordSnake}/>
            )}
        </Row>
    );
    
    const handleOnKeyPress = (e) => {

        // UP
        if(e.keyCode === 38) {
            if( s.ySpeed === 0 ) {
                s.ySpeed = -1;
                s.xSpeed = 0;
            }
        }
        // Right
        if(e.keyCode === 39) {
            if(s.xSpeed === 0) {
                s.ySpeed = 0;
                s.xSpeed = 1;
            }
        }
        // Down
        if(e.keyCode === 40) {
            if(s.ySpeed === 0) {
                s.ySpeed = 1;
                s.xSpeed = 0;
            }
        }
        // Left
        if(e.keyCode === 37) {
            if(s.xSpeed === 0) {
                s.ySpeed = 0;
                s.xSpeed = -1;
            }
        }
    }
    
    return (
        <div className="grid" tabIndex="0" onKeyDown={handleOnKeyPress}>
            {rows}
        </div>
    );
}

// Rows and Columns
function Row({style, children}) {
    return (
        <div className="row" style={style}>
            {children}
        </div>
    );
}

function Column({size, coordSnake, propKey}) {
    const columnStyles1 = {
        flexBasis: 1/size*100 + '%'
    }

    const columnStyles2 = {
        flexBasis: 1/size*100 + '%',
        backgroundColor: 'white'
    }
    
    return <div className="column" style={(coordSnake.hasOwnProperty(propKey) ? columnStyles2 : columnStyles1)}></div>;
}

export default Grid;