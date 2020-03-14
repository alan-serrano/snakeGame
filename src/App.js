import React from 'react';
import './App.scss'
import Grid from './Components/Grid';

function App() {
    return (
        <div className="app">
            <h1>Snake Game</h1>
            <Grid size="24"/>
        </div>
    );
}

export default App;