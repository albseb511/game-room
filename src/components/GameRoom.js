import React, { Component } from "react";
import axios from "axios";
import GameCard from "./GameCard";

export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      question: "",
      options: [],
      answer: "",
      counter: 0,
      loading: true,
      timeUp: () => setInterval(() => {}, 5000),
      totalCorrect: 0
    };
  }
  componentDidMount() {
    axios
      .get("https://quiet-spire-45412.herokuapp.com/questions")
      .then(resp => {
        this.setState({
          data: resp.data,
          loading: false
        });
      })
      .then(() => this.state.timeUp());
  }

  handleRadio(e) {
    if (e === this.state.data[this.state.counter].answer) {
      this.setState({ totalCorrect: this.state.totalCorrect + 1 });
    }
    console.log(this.state);
    this.setState({ counter: this.state.counter + 1 });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <div>Loading data</div>
        ) : this.state.counter < this.state.data.length ? (
          <GameCard
            question={this.state.data[this.state.counter]}
            changeFunction={e => this.handleRadio(e)}
          />
        ) : (
          <div>Game Over</div>
        )}
      </React.Fragment>
    );
  }
}
