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
      gameOver: false,
      currentWinner:'',
      showUser:false
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
          if(data.leaderBoard)
            this.setState({ leaderBoard: data.leaderBoard });
          console.log('leader board is',data.leaderBoard)
          break;
        case "currentWinner":
          console.log('current winner is',data.currentWinner)
          this.setState({currentWinner:data.currentWinner,showUser:true})
          setTimeout(()=>{this.setState({currentWinner:'',showUser:false})},1500)
          this.setState({ counter: this.state.counter + 1 });
          if(!this.state.gameOver)
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

  handleGameOver = () => {
    this.socket.emit("handleGameOver");
  };
  componentWillUnmount() {
    this.socket.close();
  }
  render() {
    if(this.state.loading)
      if (this.state.counter-1 >= this.state.data.length) {
        if (this.state.gameOver === false) {
          console.log('calling handle game over')
          this.handleGameOver();
          this.setState({ gameOver: true });
        }
      }
    console.log(this.state.leaderBoard,this.state.counter)
    return (
      <React.Fragment>
        
        {this.state.loading ? (
          <div>Loading data</div>
        ) : this.state.counter < this.state.data.length ? (<div style={{display:'flex'}}>
          <GameCard
            question={this.state.data[this.state.counter]}
            pos={this.state.counter}
            changeFunction={e => this.handleRadio(e)}
          />
           <div id='ans'>
              {this.state.showUser?this.state.currentWinner+' won the previous round is':''}
            </div>   
          </div>
        ) : (<>
          <div style={{ fontSize: "50px", textAlign: "center", margin: "auto" }}>
            Game Over
          </div>
          <div>
            {Object.keys(this.state.leaderBoard).map(a=><div class='ans purple r-15' style={{marginBottom:20}}>{a} - {this.state.leaderBoard[a]} marks</div>)}
          </div>

          <button onClick={()=>this.props.reset()} class='osxbutton'>GO TO MAIN MENU</button>
          </>
        )}
      </React.Fragment>
    );
  }
}
