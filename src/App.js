import React, {useState} from 'react';
import './App.scss'
import Grid from './Components/Grid';

function App() {
    // coordSnake is an object that has the coordinates of each part of the snake
    const [coordSnake, setCoordSnake] = useState({'r0c0': null}); 
    return (
        <div className="app">
            <Grid size="32" coordSnake={coordSnake}/>
        </div>
    );
}

export default App;