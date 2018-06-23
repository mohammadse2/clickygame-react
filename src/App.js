import React, { Component } from 'react';
import './App.css';
import fruits from './fruits.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import FruitCard from './components/FruitCard'

class App extends Component {
  state = {
    message: "Click an image to begin!",
    topScore: 0,
    curScore: 0,
    fruits: fruits,
    unselectedFruits: fruits
  }

  componentDidMount() {
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectFruit = name => {
    const findFruit = this.state.unselectedFruits.find(item => item.name === name);

    if (findFruit === undefined) {
      // failure to select a new fruit
      this.setState({
        message: "You guessed incorrectly!",
        topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
        curScore: 0,
        fruits: fruits,
        unselectedFruits: fruits
      });
    }
    else {
      // success to select a new fruit
      const newFruits = this.state.unselectedFruits.filter(item => item.name !== name);

      this.setState({
        message: "You guessed correctly!",
        curScore: this.state.curScore + 1,
        fruits: fruits,
        unselectedFruits: newFruits
      });
    }

    this.shuffleArray(fruits);
  };

  render() {
    return (
      <Wrapper>
        <Navpills
          message={this.state.message}
          curScore={this.state.curScore}
          topScore={this.state.topScore}
        />
        <Title />
        {
          this.state.fruits.map(fruit => (
            <FruitCard
              name={fruit.name}
              image={fruit.image}
              selectFruit={this.selectFruit}
              curScore={this.state.curScore}
            />
          ))
        }
      </Wrapper>
    );
  }
}

export default App;

