import React, {useState, useEffect, useRef} from 'react';
import './Grid.scss';
import Snake from './Snake';
import Food from './Food';

function Grid({size}) {
    size = parseInt(size);
    
    const [isStart, setIsStart] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const food = useRef();
    const snake = useRef();
    
    useEffect(function initializeSnake() {
        if(isStart) {
            food.current = new Food(size - 1);
            setCoordFood(food.current.getR1C1()); // Setting the first value of the food
            snake.current = new Snake(size - 1);
        }
    }, [size, isStart]);
    
    const [coordFood, setCoordFood] = useState('');
    const [coordSnake, setCoordSnake] = useState({'r0c0': null});
    const [score, setScore] = useState(0);

    useEffect(function speedUpSnake() {
        if(!isStart || isPaused) return;

        const id = setTimeout(() => {
            snake.current.update();

            let gameOver = snake.current.isDeath;

            if( gameOver ) {
                setIsGameOver(true);
                setIsStart(false);
                
            } else {
                if (snake.current.getHeadR1C1() === food.current.getR1C1()) {

                    while (snake.current.getR1C1().hasOwnProperty(food.current.getR1C1())) {
                        food.current.changePosition();
                    }
                    setScore((prevScore) => prevScore + 10);
                    setCoordFood(food.current.getR1C1());
                    snake.current.grow();
                }

                setCoordSnake(snake.current.getR1C1());
            }
        }, 100);

        return () => {
            clearTimeout(id);
        };
    }, [coordSnake, isStart, isPaused]);

    useEffect(function onKeyPressGlobal() {
        document.addEventListener('keydown', handleOnKeyPress);

        return () => {
            document.removeEventListener('keydown', handleOnKeyPress);
        }
    })

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
    
    function handleOnKeyPress(e) {
        // UP
        if(e.keyCode === 38) {
            if( snake.current.ySpeed === 0 ) {
                snake.current.ySpeed = -1;
                snake.current.xSpeed = 0;
            }
        }
        // RIGTH
        if(e.keyCode === 39) {
            if(snake.current.xSpeed === 0) {
                snake.current.ySpeed = 0;
                snake.current.xSpeed = 1;
            }
        }
        // DOWN
        if(e.keyCode === 40) {
            if(snake.current.ySpeed === 0) {
                snake.current.ySpeed = 1;
                snake.current.xSpeed = 0;
            }
        }
        // LEFT
        if(e.keyCode === 37) {
            if(snake.current.xSpeed === 0) {
                snake.current.ySpeed = 0;
                snake.current.xSpeed = -1;
            }
        }

        // ESC
        if(e.keyCode === 27 && isStart) {
            setIsPaused(isPaused => !isPaused);
        }
    }

    function onClickStart() {
        setIsStart(true);
        setIsGameOver(false);
        setScore(0);
    }
    
    function onClickContinue() {
        setIsPaused(prev => !prev);
    }
    
    return (
        <div className="grid">
            {rows}
            <p className="score">
                SCORE: {score}
            </p>

            { !isStart &&
                <div className='info'>
                    {isGameOver &&
                        <div className="game-over">
                            <p>GAME OVER</p>
                            <p>Your score: {score}</p>
                        </div>
                    }

                    <button className="btn-start-new-game" onClick={onClickStart}>
                        Start a new Game
                    </button>
                </div>
            }

            { (isStart && isPaused) &&
                <div className="info paused">
                    <button className="btn-start-new-game" onClick={onClickContinue}>
                            Continue the game
                    </button>
                </div>
            }

        </div>
    );
}

/* COMPONENT ROW */
function Row({size, children}) {
    const rowStyles = {
        height: 1/size*100 + '%'
    }

    return (
        <div className="row" style={rowStyles}>
            {children}
        </div>
    );
}

/* COMPONENT COLUMN */
function Column({size, coordSnake, coordFood, propKey}) {
    const columnStyles = {
        flexBasis: 1/size*100 + '%'
    }

    let classNames = 'column';

    if(coordSnake.hasOwnProperty(propKey)) {
        classNames += ' snake'
    }
    
    if(coordFood === propKey) {
        classNames += ' food'
    }
    
    return <div className={classNames} style={columnStyles}></div>;
}

export default Grid;