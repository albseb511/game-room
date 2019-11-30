import React, { Component } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import io from "socket.io-client";

export default class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.url = "localhost:8000";
    this.socket = io(this.url);
    this.state = {
      data: [],
      counter: 0,
      loading: true,
      leaderBoard: {},
      gameOver: false:
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
      .then(() => {
        console.log("sending start timer to server");
        this.socket.emit("start timer", {});
      });
    this.socket.on("broadcast", data => {
      switch (data.type) {
        case "leaderBoard":
          this.setState({ leaderBoard: data.leaderBoard });
          break;
        case "currentWinner":
          this.setState({ counter: this.state.counter + 1 });
          this.socket.emit("start timer", {});
          break;
        default:
          break;
      }
    });
  }

  handleRadio(e) {
    let uid = this.props.userId;
    let qno = this.state.counter;
    let answer = e === this.state.data[this.state.counter].answer;
    this.socket.connect();
    this.socket.emit("responseToServer", { uid: uid, qno: qno, ans: answer });
  }

  handleGameOver() {
    this.socket.emit("handleGameOver");
  }
  render() {

    return (
      <React.Fragment>
        {this.state.loading ? (
          <div>Loading data</div>
        ) : this.state.counter < this.state.data.length ? (
          <GameCard
            question={this.state.data[this.state.counter]}
            pos={this.state.counter}
            changeFunction={e => this.handleRadio(e)}
          />
        ) : (
          <div
            style={{ fontSize: "50px", textAlign: "center", margin: "auto" }}
          >
            {this.handleGameOver()}
            Game Over
          </div>
        )}
      </React.Fragment>
    );
  }
}
