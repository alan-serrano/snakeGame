import React, {useState, useEffect, useRef} from 'react';
import './Grid.scss';
import Snake from './Snake';
import Food from './Food';

function Grid({size}) {
    size = parseInt(size);
    
    // coordSnake is an object that has the coordinates of each part of the snake
    const [coordSnake, setCoordSnake] = useState({'r0c0': null});

    // coordFood is an object that has the coordinates of the food
    const [coordFood, setCoordFood] = useState('');
    
    // Creating instance of the food and the snake
    const food = useRef();
    const snake = useRef();

    // Handling the creation of the instances of Food and Snake
    useEffect( () => {
        food.current = new Food(size - 1);
        setCoordFood(food.current.getR1C1()); // Setting the first value of the food
        snake.current = new Snake();
    }, [size]);

    // Handling the speed of the snake
    useEffect( () => {
        const id = setTimeout(() => {
            snake.current.update(); // Update the position of the snake

            // If the head of the snake is on food position
            if(snake.current.getHeadR1C1() === food.current.getR1C1()) {
                
                // The food position should not be the same as the snake
                while( snake.current.getR1C1().hasOwnProperty( food.current.getR1C1() ) ) {
                    food.current.show();
                } 
                setCoordFood(food.current.getR1C1()); // Setting the state of food
                snake.current.grow(); // Snake grows
            }

            setCoordSnake(snake.current.getR1C1());
        }, 500);

        return () => {
            clearTimeout(id);
        };
    }, [coordSnake]);

    // Creating and empty array in order to map over them
    let rows = new Array(size).fill();
    let columns = new Array(size).fill();
    
    rows = rows.map( (value, row) =>
        <Row key={row} size={size}>
            { columns.map( (value, column) =>
                <Column
                    key={column}
                    size={size}
                    propKey={`r${row}c${column}`}
                    coordSnake={coordSnake}
                    coordFood={coordFood}
                />
            )}
        </Row>
    );
    
    const handleOnKeyPress = (e) => {
        // UP
        if(e.keyCode === 38) {
            if( snake.current.ySpeed === 0 ) {
                snake.current.ySpeed = -1;
                snake.current.xSpeed = 0;
            }
        }
        // Right
        if(e.keyCode === 39) {
            if(snake.current.xSpeed === 0) {
                snake.current.ySpeed = 0;
                snake.current.xSpeed = 1;
            }
        }
        // Down
        if(e.keyCode === 40) {
            if(snake.current.ySpeed === 0) {
                snake.current.ySpeed = 1;
                snake.current.xSpeed = 0;
            }
        }
        // Left
        if(e.keyCode === 37) {
            if(snake.current.xSpeed === 0) {
                snake.current.ySpeed = 0;
                snake.current.xSpeed = -1;
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
function Row({size, children}) {
        // Styles
    const rowStyles = {
        height: 1/size*100 + '%'
    }

    return (
        <div className="row" style={rowStyles}>
            {children}
        </div>
    );
}

function Column({size, coordSnake, coordFood, propKey}) {
    const columnStyles = {
        flexBasis: 1/size*100 + '%'
    }

    if(coordSnake.hasOwnProperty(propKey)) {
        columnStyles.backgroundColor = 'white'
    }
    
    if(coordFood === propKey) {
        columnStyles.backgroundColor = 'green'
    }
    
    return <div className="column" style={columnStyles}></div>;
}

export default Grid;