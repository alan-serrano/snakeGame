import React from 'react';
import './Grid.scss';

function Grid({size, coordSnake}) {
    size = parseInt(size);

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
    
    return (
        <div className="grid">
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