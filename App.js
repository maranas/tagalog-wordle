import React, { Component } from 'react';
import Grid from './components/Grid';

var guessCount = 5;
var answer = "mateo";

export default class App extends Component {
    render() {
        return (
          <Grid guessCount={guessCount} answer={answer}/>
        );
    }
}